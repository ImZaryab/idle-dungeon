import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import TabLayout from "../components/TabLayout";
import ItemList from "../components/ItemList";
import Listing from "../components/Listing";
import { IMapLocation } from "../types";
import DraggableMap from "../components/DraggableMap";
import useSound from "use-sound";
import modalOpenSound from "../assets/sfx/select_01.wav";
import modalCloseSound from "../assets/sfx/cancel_01.wav";
import Button from "../components/Button";

const quests = [
  {
    id: 0,
    locationId: 0,
    title: "Log supply shortage",
    type: "Gathering",
    description:
      "The local carpenter wants someone to bring a bunch of logs from the nearby forest.",
    completionTime: "30 mins",
    reputationRequirement: 0,
    buffs: {
      Endurance: "-15% completion time",
      Power: "-5% completion time",
    },
  },
  {
    id: 1,
    locationId: 0,
    title: "Stone supply shortage",
    type: "Gathering",
    description:
      "The blacksmith has ran out of stones and is willing to pay a decent reward to whoever brings some stones.",
    completionTime: "30 mins",
    reputationRequirement: 0,
    buffs: {
      Endurance: "-15% completion time",
      Power: "-5% completion time",
    },
  },
  {
    id: 2,
    locationId: 0,
    title: "Field Trouble",
    type: "Combat",
    description:
      "The locals are tired of wild beasts damaging their fields and want someone to take care of the problem by any means necessary.",
    completionTime: "1 Hour",
    reputationRequirement: 0,
    buffs: {
      Endurance: "-15% completion time",
      Power: "-5% completion time",
    },
  },
  {
    id: 3,
    locationId: 0,
    title: "The Forth",
    type: "Combat",
    description:
      "The locals are tired of wild beasts damaging their fields and want someone to take care of the problem by any means necessary.",
    completionTime: "1 Hour",
    reputationRequirement: 0,
    buffs: {
      Endurance: "-15% completion time",
      Power: "-5% completion time",
    },
  },
];

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
  {
    img: "",
    price: 15,
  },
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
  {
    img: "",
    price: 15,
  },
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
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
  {
    img: "",
    price: 10,
  },
  {
    img: "",
    price: 5,
  },
  {
    img: "",
    price: 15,
  },
];

const WorldMap = () => {
  const [openModalSound] = useSound(modalOpenSound, { volume: 5 });
  const [closeModalSound] = useSound(modalCloseSound, { volume: 5 });
  const [selectedLocation, setSelectedLocation] = useState<IMapLocation | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [showLocationDetails, setShowLocationDetails] =
    useState<boolean>(false);

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
  };

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
                  {quests
                    .filter((q) => q.locationId === selectedLocation.id)
                    .map((q, index) => (
                      <Listing key={index}>
                        <li className="absolute top-0 left-0 py-4 pr-4 pl-6">
                          <h3 className="underline underline-offset-3">
                            {q.title}
                          </h3>
                          <h4 className="mt-1">{q.description}</h4>

                          <div className="w-full flex justify-end pr-4">
                            <Button text="Accept" handleClick={() => {}} />
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
    </div>
  );
};

export default WorldMap;
