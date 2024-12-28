import { ReactNode, useRef, useState } from "react";
import { TCharacter } from "../types";
import moment from "moment";
import useQuestLoop from "../hooks/useQuestLoop";
import { createPortal } from "react-dom";
import { getQuestReward } from "../utils/quest";
import { Text } from "nes-ui-react";
import ButtonLong from "../components/ButtonLong";
import InputField from "../components/InputField";
import useImageLoader from "../hooks/useImageLoader";

const allImageSources = [
  "./male-character.svg",
  "./female-character.svg",
  "./ui-bg.svg",
  "./ui-prev.svg",
  "./ui-prev-disabled.svg",
  "./ui-next.svg",
  "./ui-next-disabled.svg",
];

const characters = [
  { src: "./male-character.svg" },
  { src: "./female-character.svg" },
];

enum Locations {
  WOODLANDS = "WOODLANDS",
}

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

function StartScreen() {
  const disableOldUI = true;
  const location1 = true;
  const requestId = useRef<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [newGame, setNewGame] = useState<boolean>(false);
  const [characterSprite, setCharacterSprite] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");

  const [character, setCharacter] = useState<TCharacter>({
    status: "idle",
    questStartTime: null,
    questCompletionTime: null,
    remainingTime: "N/A",
    img: "./character.PNG",
    claimReward: false,
  });

  const [showQuestModal, setShowQuestModal] = useState<boolean>(false);
  const [showCharacterModal, setShowCharacterModal] = useState<boolean>(false);
  const [characterSelected, setCharacterSelected] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Locations | null>(
    null
  );

  const { allLoaded: assetsLoaded } = useImageLoader(allImageSources);

  const toggleQuestModal = () => {
    // if a character was selected but then the window was closed, reset the character selection
    if (characterSelected) {
      setCharacterSelected(false);
    }
    setShowQuestModal((s) => !s);
  };

  const toggleCharacterModal = () => {
    setShowCharacterModal((s) => !s);
  };

  const handleSelectLocation = (location: Locations) => {
    setSelectedLocation(location);
    toggleQuestModal();
  };

  const handleSetCharacterQuestTime = () => {
    setCharacter({
      ...character,
      remainingTime:
        moment(character?.questCompletionTime?.diff(moment())).format(
          "m[m] s[s]"
        ) ?? "N/A",
    });
  };

  //* There should exist seperate functions:
  //* 1. Reset character properties to default state
  //* 2. Set character properties to that which correspond to quest completion behaviour
  const handleResetCharacter = () => {
    setCharacter({
      status: "idle",
      questStartTime: null,
      questCompletionTime: null,
      remainingTime: "N/A",
      img: "./character.PNG",
      claimReward: false,
    });
  };

  const handleSetClaimableReward = () => {
    setCharacter((c) => ({ ...c, claimReward: true }));
    console.log(character);
  };

  const isCharacterOnQuest = useQuestLoop({
    character,
    handleSetCharacterQuestTime,
    handleResetCharacter,
    handleSetClaimableReward,
    requestId,
  });

  const handleSendCharacterOnQuest = () => {
    const questStartTime = moment();
    console.log("questStartTime:", questStartTime.format("h[h] m[m]"));

    const questEndTime = questStartTime.add(1, "m");
    console.log("questEndTime:", questEndTime.format("h[h] m[m]"));

    const remainingTime = moment(questEndTime.diff(moment())).format(
      "m[m] s[s]"
    );
    console.log("remainingTime:", remainingTime);

    setCharacter({
      status: "in-quest",
      questStartTime: questStartTime,
      questCompletionTime: questEndTime,
      remainingTime: remainingTime,
      img: "./character.PNG",
      claimReward: false,
    });
  };

  const handleClaimReward = () => {
    //Claim Reward
    getQuestReward();

    //Reset character back to default properties
    handleResetCharacter();
  };

  const handleNextCharacterSprite = () => {
    if (characterSprite === characters.length - 1) {
      return;
    }
    setCharacterSprite((s) => s + 1);
  };

  const handlePreviousCharacterSprite = () => {
    if (characterSprite === 0) {
      return;
    }
    setCharacterSprite((s) => s - 1);
  };

  const handleCreateCharacter = async () => {
    const result = await fetch("http://localhost:3000/character/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName,
        img: characters[characterSprite].src,
      }),
    });

    console.log("RESULT BODY:", result.body);
  };

  return (
    <main className="min-h-dvh w-full flex flex-col justify-center items-center gap-4 relative">
      <h1 className={`${loading ? "block" : "hidden"} text-4xl`}>Loading...</h1>
      <img
        src="./bg-img.png"
        className={`absolute z-0 ${
          loading ? "hidden" : "block"
        } w-full max-h-[100dvh] object-cover pointer-events-none`}
        onLoad={() => setLoading(false)}
      />

      {!newGame && (
        <div className="relative z-10">
          <ButtonLong text="New Game" onClick={() => setNewGame(true)} />
        </div>
      )}

      {newGame && (
        <div>
          <h1 style={{ fontSize: "2rem" }}>Loading...</h1>
        </div>
      )}

      {newGame && !assetsLoaded && (
        <h1 style={{ zIndex: 100, fontSize: "2rem" }}>Loading Assets...</h1>
      )}

      {newGame && assetsLoaded && (
        <>
          <div className="z-10 p-10 pb-14 bg-[url('./ui-bg.svg')] w-[576px] h-[576px] flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center justify-between text-[1.5rem]">
              <Text size="xlarge">Enter Name:</Text>
              <InputField
                value={playerName}
                handleChange={setPlayerName}
                placeHolder="John Doe"
                inputProps={{ style: { fontSize: "1.5rem" } }}
              />
            </div>

            <div className="text-black w-full px-14 flex justify-between items-center">
              <button
                className={`${
                  characterSprite !== 0
                    ? "hover:cursor-pointer"
                    : "hover:cursor-not-allowed"
                }`}
                onClick={handlePreviousCharacterSprite}
              >
                <img
                  src={
                    characterSprite !== 0
                      ? "./ui-prev.svg"
                      : "./ui-prev-disabled.svg"
                  }
                  height={32}
                  width={20}
                />
              </button>
              <img
                src={characters[characterSprite].src}
                height={256}
                width={128}
              />
              <button
                className={`${
                  characterSprite !== characters.length - 1
                    ? "hover:cursor-pointer"
                    : "hover:cursor-not-allowed"
                }`}
                onClick={handleNextCharacterSprite}
              >
                <img
                  src={
                    characterSprite !== characters.length - 1
                      ? "./ui-next.svg"
                      : "./ui-next-disabled.svg"
                  }
                  height={32}
                  width={20}
                />
              </button>
            </div>

            <ButtonLong
              text="Continue"
              onClick={handleCreateCharacter}
              props={{
                disabled: playerName.length === 0,
              }}
              btnClassName={`${
                playerName.length === 0
                  ? "brightness-[0.7] disabled:hover:cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </>
      )}

      {/* Old UI */}
      {!disableOldUI && (
        <div className="min-w-[50%] min-h-[80dvh] relative">
          {/* Open character panel */}
          <div>
            <button onClick={toggleCharacterModal}>Character</button>
          </div>

          {location1 && (
            <div className="absolute top-[60%] left-[55%] -translate-x-1/2 -translate-y-1/2">
              <button
                className="pb-12 rounded-lg"
                onClick={() => handleSelectLocation(Locations.WOODLANDS)}
              >
                WOODLANDS
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quest Modal */}
      {showQuestModal && (
        <Modal>
          <button
            className="absolute top-[4%] right-[4%]"
            onClick={toggleQuestModal}
          >
            CLOSE
          </button>

          <h1 className="text-2xl">Location: {selectedLocation}</h1>

          <div className="w-full flex flex-col gap-6">
            <h1 className="text-xl">Select Character</h1>
            <ul className="">
              <li
                className={`${
                  characterSelected && "border border-teal-400"
                } w-fit p-2`}
              >
                <button onClick={() => setCharacterSelected((s) => !s)}>
                  <img src={`${character?.img}`} className="h-44 w-44" />
                  <p>Status: {character.status}</p>
                  <p>Completion Time: {character.remainingTime}</p>
                  <p>On Quest: {isCharacterOnQuest ? "True" : "False"}</p>
                </button>
              </li>
            </ul>
          </div>
          <button
            disabled={character.status !== "idle" || !characterSelected}
            onClick={handleSendCharacterOnQuest}
            className="py-2 px-4 rounded-md bg-blue-500 disabled:bg-slate-400 disabled:text-slate-600"
          >
            {character.status === "in-quest" ? "In Quest" : "Send on quest"}
          </button>
        </Modal>
      )}

      {/* Character Modal */}
      {showCharacterModal && (
        <Modal>
          <button
            className="absolute top-[4%] right-[4%]"
            onClick={toggleCharacterModal}
          >
            CLOSE
          </button>

          <div className="w-full flex flex-col gap-6">
            <ul className="">
              <li
                className={`${
                  characterSelected && "border border-teal-400"
                } w-fit p-2`}
              >
                <img src={`${character?.img}`} className="h-44 w-44" />
                <p>Status: {character.status}</p>
                <p>Completion Time: {character.remainingTime}</p>
                <p>On Quest: {isCharacterOnQuest ? "True" : "False"}</p>
              </li>
            </ul>
          </div>
          <button
            disabled={!character.claimReward}
            onClick={handleClaimReward}
            className="py-2 px-4 rounded-md bg-blue-500 disabled:bg-slate-400 disabled:text-slate-600"
          >
            Claim Reward
          </button>
        </Modal>
      )}
    </main>
  );
}

export default StartScreen;
