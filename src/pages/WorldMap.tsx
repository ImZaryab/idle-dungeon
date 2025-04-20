import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

function Modal({ children }: { children: ReactNode }) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return <div>loading...</div>;
  }

  return createPortal(
    <>
      <div className="overlay" />
      <div className="modal relative flex justify-center items-center bg-black bg-opacity-80">
        {children}
      </div>
    </>,
    modalRoot
  );
}

const WorldMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<IMapLocation | null>(
    null
  );
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
                  backgroundColor: "skyblue",
                },
              }}
            >
              <div className="map-container w-max h-max">
                <img
                  src="/world-map.png"
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
      {showLocationDetails && selectedLocation !== null && (
        <Modal>
          <button
            onClick={() => setShowLocationDetails((s) => !s)}
            className="absolute top-4 right-4 hover:cursor-pointer group"
          >
            <h3 className="underline-offset-4 group-hover:underline">CLOSE</h3>
          </button>

          <div className="flex flex-col justify-center items-center">
            <h1 className="underline underline-offset-2">Location Details</h1>
            <h2 className="text-center">{selectedLocation.locationDetails}</h2>

            <div className="flex items-center justify-center gap-4">
              <button className="py-4 px-8 mt-8 bg-teal-700 hover:cursor-pointer hover:text-black hover:bg-white">
                <h2>Go on a quest</h2>
              </button>
              <button className="py-4 px-8 mt-8 bg-teal-700 hover:cursor-pointer hover:text-black hover:bg-white disabled:cursor-not-allowed disabled:bg-teal-950 disabled:text-slate-600">
                <h2>Shop</h2>
              </button>
              <button disabled className="py-4 px-8 mt-8 bg-teal-700 hover:cursor-pointer hover:text-black hover:bg-white disabled:cursor-not-allowed disabled:bg-teal-950 disabled:text-slate-600">
                <h2>Rest</h2>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WorldMap;
