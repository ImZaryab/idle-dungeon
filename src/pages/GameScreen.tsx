import { ReactNode, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Character, CharacterStatus, Locations } from "../types";
import { createPortal } from "react-dom";
import { Button } from "nes-ui-react";
import useStore from "../store";

function Modal({ children }: { children: ReactNode }) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return <div>loading...</div>;
  }

  return createPortal(
    <>
      <div className="overlay" />
      <div className="modal flex flex-col justify-center items-center gap-4 relative">
        {children}
      </div>
    </>,
    modalRoot
  );
}

export const GameScreen = () => {
  const authUser = useStore((state) => state.authUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCampOpen, setIsCampOpen] = useState<boolean>(false);
  const [isQuestOpen, setIsQuestOpen] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [showSendOnQuestModal, setShowSendOnQuestModal] =
    useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const [isFetchingCharacters, setIsFetchingCharacters] = useState(false);
  const [fetchCharactersError, setFetchCharactersError] = useState<
    string | null
  >(null);

  const fetchCharacters = useCallback(async () => {
    // Separate data fetching into its own function
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/character/getBoundCharacters`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: authUser?.id ?? "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }

      return await response.json();
    };

    // Loading state handling happens outside the memoized function
    if (isFetchingCharacters) return;

    setIsFetchingCharacters(true);
    setFetchCharactersError(null);

    try {
      const result = await fetchData();
      setCharacters(result ?? []);
    } catch (err) {
      setFetchCharactersError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching characters"
      );
    } finally {
      setIsFetchingCharacters(false);
    }
  }, [authUser]);
  //! Adding 'isFetchingCharacters' will cause infinite loop

  useEffect(() => {
    if (authUser?.id) {
      fetchCharacters();
    }
  }, [authUser, fetchCharacters]);

  useEffect(() => {
    if (!authUser?.id) return;

    const eventSource = new EventSource(
      `http://localhost:3000/api/character/stream`
    );

    // Handle successful connections
    eventSource.onopen = () => {
      console.log("SSE connection established");
    };

    // Handle messages
    eventSource.onmessage = (event) => {
      try {
        const completionPayload: {
          message: string;
          playableCharacterId: number;
        } = JSON.parse(event.data);

        console.log("Received SSE update:", completionPayload);
        fetchCharacters();
      } catch (err) {
        console.error("Error processing SSE message:", err);
        setFetchCharactersError("Error processing server event");
      }
    };

    // Handle errors
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setFetchCharactersError("Lost connection to server events");
      eventSource.close();
    };

    // Clean up the connection when component unmounts
    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, [authUser, fetchCharacters]);

  if (!authUser) {
    return <h1>No authorised user data found!</h1>;
  }

  if (fetchCharactersError) {
    return (
      <div className="error-container">
        <div className="error-message">{fetchCharactersError}</div>
        <button
          onClick={() => {
            setFetchCharactersError(null);
            fetchCharacters();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const toggleCharacterModal = () => {
    setShowCharacterModal((s) => !s);
    setShowSendOnQuestModal(false);
  };

  const handleSetSelectedCharacter = (character: Character) => {
    setSelectedCharacter(character);
    toggleCharacterModal();
  };

  const handleSendOnQuest = async (location: Locations) => {
    if (!selectedCharacter) return;

    const payload = {
      playableCharacterId: selectedCharacter.id,
      questLocation: location,
    };

    console.log("Request Payload:", payload);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/character/sendOnQuest`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const result: { quest: unknown; message: string; completed: boolean } =
      await response.json();
    console.log("handleSendOnQuest: ", result);

    if (result.completed) {
      fetchCharacters();
    }

    toggleCharacterModal();
  };

  // const handleClaimReward = () => {
  //   //Claim Reward
  //   getQuestReward();

  //   //Reset character back to default properties
  //   handleResetCharacter();
  // };

  return (
    <main className="min-h-dvh w-full relative overflow-hidden">
      {/* Background Img */}
      <h1 className={`${loading ? "block" : "hidden"} text-4xl`}>Loading...</h1>
      <img
        src="./bg-img.png"
        className={`absolute z-0 ${
          loading ? "hidden" : "block"
        } w-full max-h-[100dvh] object-cover pointer-events-none`}
        onLoad={() => setLoading(false)}
      />

      {/* Camp Menu */}
      <motion.div
        initial={false}
        animate={isCampOpen ? "open" : "closed"}
        variants={{
          open: { translateY: "0%" },
          closed: { translateY: "92%" },
        }}
        transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 }}
        className="menu px-2 z-10 bg-gray-400 text-black w-[30dvw] h-[40dvh] absolute bottom-0 left-0"
        onClick={() => setIsCampOpen(!isCampOpen)}
      >
        <motion.div>
          <span style={{ fontSize: "2rem" }}>In Camp</span>
        </motion.div>
        <ul className="mt-6 flex flex-col gap-2">
          {characters
            .filter((char) => char.status === CharacterStatus.IDLE)
            .map((character) => (
              <li
                key={character.id}
                className="border border-black flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <img src={character.img} alt="" width={50} />
                  <div className="flex flex-col">
                    <p style={{ fontSize: "1.5rem" }}>{character.name}</p>
                    <p style={{ fontSize: "1rem" }}>HP: {character.hp}/100</p>
                    <p style={{ fontSize: "1rem" }}>
                      Mana: {character.mana}/100
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      Energy: {character.energy}/10
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSetSelectedCharacter(character)}
                  className="h-12 w-12 hover:cursor-pointer bg-amber-500"
                ></button>
              </li>
            ))}
        </ul>
      </motion.div>

      {/* Quest Menu */}
      <motion.div
        initial={false}
        animate={isQuestOpen ? "open" : "closed"}
        variants={{
          open: { translateY: "0%" },
          closed: { translateY: "92%" },
        }}
        transition={{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 }}
        className="menu px-2 z-10 bg-gray-400 text-black w-[30dvw] h-[40dvh] absolute bottom-0 right-0"
        onClick={() => setIsQuestOpen(!isQuestOpen)}
      >
        <motion.div>
          <span style={{ fontSize: "2rem" }}>On Quest</span>
        </motion.div>
        <ul className="mt-6 flex flex-col gap-2">
          {characters
            .filter((char) => char.status === CharacterStatus.INQUEST)
            .map((character) => (
              <li
                key={character.id}
                className="border border-black flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <img src={character.img} alt="" width={50} />
                  <div className="flex flex-col">
                    <p style={{ fontSize: "1.5rem" }}>{character.name}</p>
                    <p style={{ fontSize: "1rem" }}>HP: {character.hp}/100</p>
                    <p style={{ fontSize: "1rem" }}>
                      Mana: {character.mana}/100
                    </p>
                    <p style={{ fontSize: "1rem" }}>
                      Energy: {character.energy}/10
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSetSelectedCharacter(character)}
                  className="h-12 w-12 hover:cursor-pointer bg-amber-500"
                ></button>
              </li>
            ))}
        </ul>
      </motion.div>

      {/* Character Modal */}
      {showCharacterModal && (
        <Modal>
          <button
            className="absolute top-[4%] right-[4%] hover:cursor-pointer"
            onClick={toggleCharacterModal}
          >
            CLOSE
          </button>
          {!showSendOnQuestModal ? (
            <>
              <div className="w-full flex flex-col justify-center items-center gap-6">
                <img src={`${selectedCharacter?.img}`} className="h-44 w-44" />
                <p style={{ fontSize: "1.5rem" }}>
                  Status: {selectedCharacter?.status}
                </p>
                <Button onClick={() => setShowSendOnQuestModal((s) => !s)}>
                  <p style={{ fontSize: "1.5rem" }}>Send on quest</p>
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "1.5rem" }}>Select Quest Location:</h2>
              <ul className="flex flex-col gap-4">
                <li>
                  <button
                    onClick={() => handleSendOnQuest(Locations.WOODLANDS)}
                    disabled={false}
                    className="p-4 hover:cursor-pointer hover:bg-cyan-600"
                    style={{ fontSize: "1.25rem" }}
                  >
                    {Locations.WOODLANDS}
                  </button>
                </li>
                <li>
                  <button
                    disabled={true}
                    className="p-4 hover:cursor-pointer disabled:hover:cursor-not-allowed hover:bg-cyan-600"
                    style={{ fontSize: "1.25rem" }}
                  >
                    LOCATION 2
                  </button>
                </li>
                <li>
                  <button
                    disabled={true}
                    className="p-4 hover:cursor-pointer disabled:hover:cursor-not-allowed hover:bg-cyan-600"
                    style={{ fontSize: "1.25rem" }}
                  >
                    LOCATION 3
                  </button>
                </li>
              </ul>
            </>
          )}
        </Modal>
      )}
    </main>
  );
};
