import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import TabLayout from "../components/TabLayout";
import ItemList from "../components/ItemList";
import Listing from "../components/Listing";
import {
  Character,
  CharacterStatus,
  IMapLocation,
  LocationQuest,
  SSEEventPayload,
} from "../types";
import DraggableMap from "../components/DraggableMap";
import useSound from "use-sound";
import modalOpenSound from "../assets/sfx/select_01.wav";
import modalCloseSound from "../assets/sfx/cancel_01.wav";
import Button from "../components/Button";
import { useGetLocationQuests } from "../controllers/quest";
import {
  useCompleteQuest,
  useGetCharacters,
  useSendCharacterOnQuest,
} from "../controllers/characters";
import useStore from "../store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

enum ModalTabs {
  Questboard = "Questboard",
  Shop = "Shop",
  Inn = "Inn",
}

const tabs = [...Object.values(ModalTabs)];

const items = [
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
];

const WorldMap = () => {
  const [openModalSound] = useSound(modalOpenSound, { volume: 5 });
  const [closeModalSound] = useSound(modalCloseSound, { volume: 5 });
  const [selectedLocation, setSelectedLocation] = useState<IMapLocation | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [selectedQuest, setSelectedQuest] = useState<null | number>(null);
  const [showCharacterSelectionModal, setShowCharacterSelectionModal] =
    useState<boolean>(false);
  useState<boolean>(false);
  const [showLocationDetails, setShowLocationDetails] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: quests, isLoading: locationQuestsLoading } =
    useGetLocationQuests(selectedLocation?.id);

  const user = useStore((state) => state.authUser);
  // userData accessible via: queryClient.getQueryData([`${user?.name}-UserData`])

  const { data: characters } = useGetCharacters(user?.id);

  const { mutate: sendCharacterOnQuest, isPending: isSendingCharacterOnQuest } =
    useSendCharacterOnQuest();

  const { mutate: completeQuest } = useCompleteQuest();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controllerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!controllerRef.current || !containerRef.current) return;

    // Function to center the viewport on the image
    const centerImage = () => {
      if (controllerRef.current) {
        controllerRef.current.centerView(1);
      }
    };

    // Initialize ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(() => {
      centerImage();
    });

    // Start observing the container
    resizeObserver.observe(containerRef.current);

    // Initial centering with a small delay
    setTimeout(centerImage, 100);

    // Clean up observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  });

  //* SSE EventSource
  useEffect(() => {
    if (!user?.id) return;

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
        const eventPayload: SSEEventPayload = JSON.parse(event.data);
        //Handle SSE updates based on "type"
        switch (eventPayload.type) {
          case "questCompleted":
            console.log("Received questCompleted update:", eventPayload);
            queryClient.setQueryData(
              [`${user?.id}-Characters`],
              (oldData: any) => {
                if (!oldData) return oldData;
                const optimisticUpdate = oldData.map((char: Character) =>
                  char.id === eventPayload.playableCharacterId
                    ? { ...char, status: CharacterStatus.QUESTCOMPLETED }
                    : char
                );
                return optimisticUpdate;
              }
            );
            break;
          case "rewardClaimed":
            console.log("Received rewardClaimed update:", eventPayload);
            break;
          default:
            console.log("Received unknown update:", eventPayload);
        }
      } catch (err) {
        console.error("Error processing SSE message:", err);
      } finally {
        //TODO
      }
    };

    // Handle errors
    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    // Clean up the connection when component unmounts
    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, [user]);

  const handleLocationModalToggle = () => {
    if (!showLocationDetails) {
      openModalSound();
    } else {
      closeModalSound();
    }
    setShowLocationDetails((s) => !s);
    setSelectedTab(tabs[0]);
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleSetSelectedLocation = (location: IMapLocation) => {
    setSelectedLocation(location);
    // console.log(locationQuestsLoading);
    // console.log(locationQuestsError);
  };

  const handleShowCharacterSelectionModal = (questId: number) => {
    if (!showCharacterSelectionModal) {
      setShowLocationDetails(false);
      if (questId) setSelectedQuest(questId);
    }
    setShowCharacterSelectionModal((s) => !s);
  };

  const handleSendCharacterOnQuest = (characterId: number) => {
    if (!selectedQuest) {
      console.warn("No quest selected");
      return;
    }

    sendCharacterOnQuest(
      {
        characterId: characterId,
        locationId: selectedLocation?.id,
        questId: selectedQuest ? selectedQuest : undefined,
      },
      {
        onSuccess: () => {
          //Close the character selection modal
          setShowCharacterSelectionModal(false);
          setShowLocationDetails(true);

          queryClient.setQueryData(
            [`${user?.id}-Characters`],
            (oldData: any) => {
              if (!oldData) return oldData;
              const optimisticUpdate = oldData.map((char: Character) =>
                char.id === characterId
                  ? { ...char, status: CharacterStatus.INQUEST }
                  : char
              );
              return optimisticUpdate;
            }
          );

          toast("Character sent on quest!", {
            duration: 5000,
          });
        },
        onError: (error) => {
          console.error(
            `Failed to send character ${characterId} on quest:`,
            error
          );
        },
      }
    );
  };

  const handleCompleteQuest = (characterId: number) => {
    completeQuest(
      { characterId: characterId },
      {
        onSuccess: () => {
          //Refetch the latest states of the characters
          queryClient.invalidateQueries({
            queryKey: [`${user?.id}-Characters`],
          });

          toast("Quest completed and rewards claimed!", {
            duration: 5000,
          });
        },
        onError: (error) => {
          console.error(
            `Failed to complete quest for character ${characterId}:`,
            error
          );
        },
      }
    );
  };

  // console.log("User:", user);
  // console.log("UserData:", userData);
  // console.log("UserDataError:", userDataError);
  // console.log("userDataLoading:", userDataLoading);
  // console.log("CharactersError:", charactersError);
  // console.log("CharactersLoading:", charactersLoading);
  // console.log("Characters:", characters);
  // console.log("isSendingCharacterOnQuest:", isSendingCharacterOnQuest);
  // console.log("sendCharacterOnQuestError:", sendCharacterOnQuestError);
  // console.log("sendCharacterOnQuestResult:", sendCharacterOnQuestResult);
  // console.log("isCompletingQuest:", isCompletingQuest);
  // console.log("completeQuestError:", completeQuestError);
  // console.log("completeQuestResult:", completeQuestResult);

  return (
    <div
      id="game-content"
      className="h-full w-full overflow-hidden"
      ref={containerRef}
    >
      <DraggableMap
        controllerRef={controllerRef}
        handleSetSelectedLocation={handleSetSelectedLocation}
        handleSetShowLocationDetails={handleLocationModalToggle}
      />

      {/* Location Details Modal */}
      {selectedLocation !== null && (
        <Modal
          showModal={showLocationDetails}
          handleModalToggle={handleLocationModalToggle}
        >
          <div className="text-teal-900">
            <div className="px-10 pt-1 w-full">
              <TabLayout
                tabs={tabs}
                value={selectedTab}
                handleTabChange={handleTabChange}
              />

              {/* QUESTBOARD */}
              {selectedTab === ModalTabs.Questboard && (
                <ul className="mt-4 flex flex-col gap-4 items-center h-[430px] overflow-y-auto">
                  {locationQuestsLoading && (
                    <div className="text-white h-full flex justify-center items-center">
                      <h3>Gathering quests...</h3>
                    </div>
                  )}
                  {!locationQuestsLoading &&
                    quests &&
                    quests.map((q: LocationQuest, index: number) => (
                      <Listing key={index}>
                        <li className="absolute top-0 left-0 py-4 pr-4 pl-6">
                          <h3 className="underline underline-offset-3">
                            {q.title}
                          </h3>
                          <h4 className="mt-1">{q.description}</h4>

                          <div className="w-full flex justify-end pr-4">
                            <Button
                              text="Accept"
                              handleClick={() =>
                                handleShowCharacterSelectionModal(q.id)
                              }
                            />
                          </div>
                        </li>
                      </Listing>
                    ))}
                </ul>
              )}
              {/* SHOP */}
              {selectedTab === ModalTabs.Shop && <ItemList items={items} />}
            </div>
          </div>
        </Modal>
      )}

      {/* Quest Character Selection Modal */}
      {selectedQuest !== null && (
        <Modal
          showModal={showCharacterSelectionModal}
          handleModalToggle={() => setShowCharacterSelectionModal((s) => !s)}
        >
          <div className="text-teal-900">
            <div className="px-10 pt-1 w-full">
              <ul className="mt-4 flex flex-col gap-4 items-center h-[430px] overflow-y-auto">
                {characters &&
                  characters.map((c: Character, index: number) => (
                    <Listing key={index}>
                      <li className="absolute flex w-full h-[140px] top-0 left-0 py-4 pr-4 pl-6">
                        <h3 className="underline underline-offset-3">
                          {c.name}
                        </h3>
                        <div className="w-full flex justify-end items-end pr-4">
                          {c.status === CharacterStatus.IDLE ? (
                            <Button
                              disabled={
                                c.status !== CharacterStatus.IDLE ||
                                isSendingCharacterOnQuest
                              }
                              text={
                                isSendingCharacterOnQuest
                                  ? "Sending..."
                                  : "Select"
                              }
                              handleClick={() =>
                                handleSendCharacterOnQuest(c.id)
                              }
                            />
                          ) : (
                            <div className="h-full flex flex-col justify-between items-center">
                              <h1>Busy</h1>
                              {c.status === CharacterStatus.QUESTCOMPLETED && (
                                <Button
                                  text="Complete"
                                  handleClick={() => handleCompleteQuest(c.id)}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    </Listing>
                  ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WorldMap;
