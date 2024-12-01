import { ReactNode, useRef, useState } from "react";
import { TCharacter } from "./types";
import moment from "moment";
import useQuestLoop from "./hooks/useQuestLoop";
import { createPortal } from "react-dom";

enum Locations {
  wildlands = "Wildlands",
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

function App() {
  const disableUI = true;
  const location1 = true;
  const requestId = useRef<number>(0);
  const [character, setCharacter] = useState<TCharacter>({
    status: "idle",
    questStartTime: null,
    questCompletionTime: null,
    remainingTime: "N/A",
    img: "./character.PNG",
  });

  const [showQuestModal, setShowQuestModal] = useState<boolean>(false);
  const [characterSelected, setCharacterSelected] = useState<boolean>(false);

  const [selectedLocation, setSelectedLocation] = useState<Locations | null>(
    null
  );

  const toggleQuestModal = () => {
    // if a character was selected but then the window was closed, reset the character selection
    if (characterSelected) {
      setCharacterSelected(false);
    }
    setShowQuestModal((s) => !s);
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

  const handleResetCharacter = () => {
    setCharacter({
      status: "idle",
      questStartTime: null,
      questCompletionTime: null,
      remainingTime: "N/A",
      img: "./character.PNG",
    });
  };

  const isCharacterOnQuest = useQuestLoop({
    character,
    handleSetCharacterQuestTime,
    handleResetCharacter,
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
    });
  };

  return (
    <main className="min-h-dvh w-full flex flex-col justify-center items-center gap-4">
      <div className="game-terrain min-w-[50%] min-h-[80dvh] relative">
        {!disableUI && (
          <>
            <h1>Player</h1>
            <p>Status: {character.status}</p>
            <p>Completion Time: {character.remainingTime}</p>
            <p>On Quest: {isCharacterOnQuest ? "True" : "False"}</p>

            <button
              disabled={character.status !== "idle"}
              onClick={handleSendCharacterOnQuest}
              className="py-2 px-4 rounded-md bg-blue-500 disabled:bg-slate-400 disabled:text-slate-600"
            >
              {character.status === "in-quest" ? "In Quest" : "Send on quest"}
            </button>
          </>
        )}

        {location1 && (
          <div className="absolute top-[60%] left-[55%] -translate-x-1/2 -translate-y-1/2">
            <button
              className="pb-12 rounded-lg"
              onClick={() => handleSelectLocation(Locations.wildlands)}
            >
              Wildlands
            </button>
          </div>
        )}
      </div>

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
    </main>
  );
}

export default App;
