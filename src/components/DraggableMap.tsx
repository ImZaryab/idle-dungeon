import { MutableRefObject } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IMapLocation } from "../types";

interface DraggableMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controllerRef: MutableRefObject<any>;
  handleSetSelectedLocation: (location: IMapLocation) => void;
  handleSetShowLocationDetails: () => void;
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

const DraggableMap = ({
  controllerRef,
  handleSetShowLocationDetails,
  handleSetSelectedLocation,
}: DraggableMapProps) => {
  const handleLocationClick = (location: IMapLocation) => {
    const userSelectedLocation = worldMapLocations.find(
      (loc) => loc.id === location.id,
    );

    if (userSelectedLocation !== undefined) {
      handleSetSelectedLocation(userSelectedLocation);
      handleSetShowLocationDetails();
    }
  };

  return (
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
                  <p>{location.name}</p>
                </button>
              </div>
            ))}
          </TransformComponent>
        );
      }}
    </TransformWrapper>
  );
};
export default DraggableMap;
