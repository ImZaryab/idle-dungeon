import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const worldMapLocations = [
  {
    name: "Shore",
    position: { top: "42%", left: "20%" },
  },
  {
    name: "Forest",
    position: { top: "28%", left: "45%" },
  },
  {
    name: "Town",
    position: { top: "43%", left: "71%" },
  },
  {
    name: "Monument",
    position: { top: "56%", left: "46%" },
  },
];

const WorldMap = () => {
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
      >
        {({ centerView, instance }) => {
          controllerRef.current = { centerView, instance };

          return (
            <TransformComponent
              wrapperClass="w-full h-full max-w-[100vw] max-h-[100vh]"
              wrapperStyle={{ ...{ width: "100%", height: "100%" } }}
            >
              <div className="map-container w-max h-max">
                <img
                  src="/game-tilemap.png"
                  alt=""
                  className="w-auto h-[100dvh] object-contain"
                  draggable={false}
                />
              </div>

              {/* World Map Locations */}
              {worldMapLocations.map((location, index) => (
                <div
                  key={index}
                  className="absolute w-auto h-auto cursor-pointer group hover:scale-110"
                  style={location.position}
                >
                  <div className="min-w-[125px] bg-white text-black p-2 flex justify-center items-center bg-opacity-80 hover:bg-opacity-100">
                    <p style={{ fontSize: "1.25rem" }}>{location.name}</p>
                  </div>
                </div>
              ))}
            </TransformComponent>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

export default WorldMap;
