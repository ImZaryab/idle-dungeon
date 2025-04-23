import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Modal from "../components/Modal";
import TabLayout from "../components/TabLayout";
import ItemList from "../components/ItemList";
import Listing from "../components/Listing";

interface IMapLocation {
  id: number;
  name: string;
  position: {
    top: string;
    left: string;
  };
  isDisabled: boolean;
  locationDetails: string;
}

const worldMapLocations: IMapLocation[] = [
  {
    id: 0,
    name: "Westfordshire",
    position: { top: "51%", left: "18%" },
    isDisabled: false,
    locationDetails:
      "This is your home town. You start your adventures from here. Before you leave, make sure your inventory is stacked and your gear is all set! Once your adventure is over, you can come back here to rest.",
  },
  {
    id: 1,
    name: "Altar of stars",
    position: { top: "28%", left: "45%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 2,
    name: "Sanctum of sorrows",
    position: { top: "40%", left: "69%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 3,
    name: "Cloudmillton",
    position: { top: "45%", left: "51%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 4,
    name: "Sunpoint Settlement",
    position: { top: "66%", left: "48%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 5,
    name: "Haunted Archives",
    position: { top: "66%", left: "32%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 6,
    name: "Clear Falls",
    position: { top: "44%", left: "33%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 7,
    name: "Lost Lair",
    position: { top: "34%", left: "34%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 8,
    name: "Serpent Queen's Dwelling",
    position: { top: "16%", left: "48%" },
    isDisabled: true,
    locationDetails: "",
  },
  {
    id: 9,
    name: "Vault of Sheddin",
    position: { top: "29%", left: "67%" },
    isDisabled: true,
    locationDetails: "",
  },
];

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
  const [selectedLocation, setSelectedLocation] = useState<IMapLocation | null>(
    null
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

  const handleLocationClick = (location: IMapLocation) => {
    const userSelectedLocation = worldMapLocations.find(
      (loc) => loc.id === location.id
    );

    if (userSelectedLocation !== undefined) {
      setSelectedLocation(userSelectedLocation);
      setShowLocationDetails((s) => !s);
    }
  };

  const handleLocationModalToggle = () => {
    setShowLocationDetails((s) => !s);
    setSelectedTab(tabs[0]);
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div
      id="game-content"
      className="h-full w-full overflow-hidden"
      ref={containerRef}
    >
      <TransformWrapper
        ref={controllerRef}
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
      >
        {({ centerView, instance }) => {
          controllerRef.current = { centerView, instance };

          return (
            <TransformComponent
              wrapperClass="w-full h-full max-w-[100vw] max-h-[100vh]"
              wrapperStyle={{
                ...{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "steelblue",
                },
              }}
            >
              <div className="map-container w-max h-max">
                <img
                  src="/world-map-2.png"
                  alt=""
                  className="w-auto h-[100dvh] object-contain"
                  draggable={false}
                />
              </div>

              {/* World Map Locations */}
              {worldMapLocations.map((location, index) => (
                <div
                  key={index}
                  className={`absolute w-auto h-auto cursor-pointer group ${
                    !location.isDisabled
                      ? "hover:scale-110"
                      : "hover:cursor-not-allowed"
                  }`}
                  style={location.position}
                >
                  <button
                    disabled={location.isDisabled}
                    className={`min-w-[125px] bg-white text-black p-2 flex justify-center items-center ${
                      !location.isDisabled
                        ? "bg-opacity-80 hover:bg-opacity-100"
                        : "bg-opacity-50 hover:cursor-not-allowed"
                    }`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <p style={{ fontSize: "1.25rem" }}>{location.name}</p>
                  </button>
                </div>
              ))}
            </TransformComponent>
          );
        }}
      </TransformWrapper>

      {/* Location Details Modal */}
      {selectedLocation !== null && (
        <Modal
          showModal={showLocationDetails}
          handleModalToggle={handleLocationModalToggle}
        >
          <div className="text-teal-900">
            <div className="px-10 py-6 w-full">
              <TabLayout
                tabs={tabs}
                value={selectedTab}
                handleTabChange={handleTabChange}
              />

              {/* QUESTBOARD */}
              {selectedTab === ModalTabs.Questboard && (
                <ul className="mt-6 flex flex-col gap-4 items-center h-[405px] overflow-y-auto">
                  {quests
                    .filter((q) => q.locationId === selectedLocation.id)
                    .map((q, index) => (
                      <Listing key={index}>
                        <li className="absolute top-0 left-0 py-4 pr-4 pl-6">
                          <h2 className="px-8 underline underline-offset-3">
                            {q.title}
                          </h2>
                          <h3 className="mt-1">{q.description}</h3>

                          <div className="w-full flex justify-end pr-4">
                            <button className="hover:cursor-pointer border border-teal-900 px-4 text-center py-1 hover:bg-white">
                              <h3>Accept</h3>
                            </button>
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
