import { useState } from "react";

interface CloseBtnProps {
  handleOnClick: () => void;
}

const CloseBtn = ({ handleOnClick }: CloseBtnProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <button
      onClick={handleOnClick}
      className="hover:cursor-pointer"
      onMouseEnter={() => setIsHover((s) => !s)}
      onMouseLeave={() => setIsHover((s) => !s)}
    >
      {!isHover ? (
        <svg
          width={21 * 2}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -0.5 21 21"
          shape-rendering="crispEdges"
        >
          <metadata>
            Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
          </metadata>
          <path
            stroke="#4d4539"
            d="M8 0h5M6 1h2M13 1h2M5 2h1M15 2h1M4 3h1M16 3h1M3 4h1M17 4h1M2 5h1M18 5h1M1 6h1M19 6h1M1 7h1M19 7h1M0 8h1M20 8h1M0 9h1M20 9h1M0 10h1M20 10h1M0 11h1M20 11h1M0 12h1M20 12h1M1 13h1M19 13h1M1 14h1M19 14h1M2 15h1M18 15h1M3 16h1M17 16h1M4 17h1M16 17h1M5 18h1M15 18h1M6 19h2M13 19h2M8 20h5"
          />
          <path
            stroke="#d2c9a5"
            d="M8 1h5M6 2h2M13 2h2M5 3h1M4 4h1M3 5h1M2 6h1M7 6h1M2 7h1M6 7h2M1 8h1M8 8h1M12 8h1M1 9h1M5 9h1M9 9h1M11 9h1M1 10h1M1 11h1M9 11h1M11 11h1M1 12h1M8 12h1M12 12h1M2 13h1M2 14h1"
          />
          <path
            stroke="#d1b187"
            d="M8 2h5M7 3h1M13 3h1M6 4h1M14 4h1M5 5h1M15 5h1M4 6h1M16 6h1M3 7h1M17 7h1M2 8h1M18 8h1M2 9h1M18 9h1M2 10h1M18 10h1M2 11h1M18 11h1M2 12h1M18 12h1M3 13h1M17 13h1M4 14h1M16 14h1M5 15h1M15 15h1M6 16h1M14 16h1M7 17h1M13 17h1M8 18h5"
          />
          <path
            stroke="#ba9158"
            d="M6 3h1M8 3h5M14 3h2M5 4h1M7 4h1M13 4h1M15 4h2M4 5h1M6 5h1M14 5h1M16 5h2M3 6h1M5 6h1M15 6h1M17 6h2M4 7h1M16 7h1M18 7h1M3 8h1M9 8h1M11 8h1M17 8h1M3 9h1M8 9h1M10 9h1M12 9h1M17 9h1M3 10h1M9 10h1M11 10h1M17 10h1M3 11h1M8 11h1M10 11h1M12 11h1M17 11h1M3 12h1M9 12h1M11 12h1M17 12h1M4 13h1M16 13h1M3 14h1M5 14h1M15 14h1M17 14h1M3 15h2M6 15h1M14 15h1M16 15h1M4 16h2M7 16h1M13 16h1M15 16h1M5 17h2M8 17h5M14 17h1M6 18h2"
          />
          <path
            stroke="#ae5d40"
            d="M8 4h5M7 5h1M12 5h1M6 6h1M13 6h1M5 7h1M13 7h2M4 8h1M13 8h3M4 9h1M13 9h3M4 10h1M12 10h4M4 11h1M13 11h3M4 12h2M10 12h1M13 12h3M6 13h9M7 14h7M8 15h5"
          />
          <path
            stroke="#c77b58"
            d="M8 5h4M8 6h5M8 7h5M5 8h3M10 8h1M6 9h2M5 10h4M5 11h3M6 12h2"
          />
          <path
            stroke="#79444a"
            d="M13 5h1M14 6h1M15 7h1M16 8h1M16 9h1M16 10h1M16 11h1M16 12h1M5 13h1M15 13h1M6 14h1M14 14h1M7 15h1M13 15h1M8 16h5"
          />
          <path
            stroke="#927441"
            d="M19 8h1M19 9h1M19 10h1M19 11h1M19 12h1M18 13h1M18 14h1M17 15h1M16 16h1M15 17h1M13 18h2M8 19h5"
          />
          <path stroke="#b3a555" d="M10 10h1" />
        </svg>
      ) : (
        <svg
          width={21 * 2}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -0.5 21 21"
          shape-rendering="crispEdges"
        >
          <metadata>
            Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
          </metadata>
          <path
            stroke="#4d4539"
            d="M8 0h5M6 1h2M13 1h2M5 2h1M15 2h1M4 3h1M16 3h1M3 4h1M17 4h1M2 5h1M18 5h1M1 6h1M19 6h1M1 7h1M19 7h1M0 8h1M20 8h1M0 9h1M20 9h1M0 10h1M20 10h1M0 11h1M20 11h1M0 12h1M20 12h1M1 13h1M19 13h1M1 14h1M19 14h1M2 15h1M18 15h1M3 16h1M17 16h1M4 17h1M16 17h1M5 18h1M15 18h1M6 19h2M13 19h2M8 20h5"
          />
          <path
            stroke="#d2c9a5"
            d="M8 1h5M6 2h2M13 2h2M5 3h1M4 4h1M3 5h1M2 6h1M2 7h1M1 8h1M1 9h1M1 10h1M1 11h1M1 12h1M2 13h1M2 14h1"
          />
          <path
            stroke="#d1b187"
            d="M8 2h5M7 3h1M13 3h1M6 4h1M14 4h1M5 5h1M15 5h1M4 6h1M16 6h1M3 7h1M17 7h1M2 8h1M18 8h1M2 9h1M18 9h1M2 10h1M18 10h1M2 11h1M18 11h1M2 12h1M18 12h1M3 13h1M17 13h1M4 14h1M16 14h1M5 15h1M15 15h1M6 16h1M14 16h1M7 17h1M13 17h1M8 18h5"
          />
          <path
            stroke="#ba9158"
            d="M6 3h1M8 3h5M14 3h2M5 4h1M7 4h1M13 4h1M15 4h2M4 5h1M6 5h1M14 5h1M16 5h2M3 6h1M5 6h1M15 6h1M17 6h2M4 7h1M16 7h1M18 7h1M3 8h1M17 8h1M3 9h1M17 9h1M3 10h1M17 10h1M3 11h1M17 11h1M3 12h1M17 12h1M4 13h1M16 13h1M3 14h1M5 14h1M15 14h1M17 14h1M3 15h2M6 15h1M14 15h1M16 15h1M4 16h2M7 16h1M13 16h1M15 16h1M5 17h2M8 17h5M14 17h1M6 18h2"
          />
          <path
            stroke="#79444a"
            d="M8 4h5M7 5h7M6 6h9M5 7h11M4 8h4M10 8h1M13 8h4M4 9h4M13 9h4M4 10h5M12 10h5M4 11h4M13 11h4M4 12h4M10 12h1M13 12h4M5 13h11M6 14h9M7 15h7M8 16h5"
          />
          <path
            stroke="#c77b58"
            d="M8 8h1M12 8h1M9 9h1M11 9h1M9 11h1M11 11h1M8 12h1M12 12h1"
          />
          <path
            stroke="#ae5d40"
            d="M9 8h1M11 8h1M8 9h1M10 9h1M12 9h1M9 10h1M11 10h1M8 11h1M10 11h1M12 11h1M9 12h1M11 12h1"
          />
          <path
            stroke="#927441"
            d="M19 8h1M19 9h1M19 10h1M19 11h1M19 12h1M18 13h1M18 14h1M17 15h1M16 16h1M15 17h1M13 18h2M8 19h5"
          />
          <path stroke="#de7954" d="M10 10h1" />
        </svg>
      )}
    </button>
  );
};

export default CloseBtn;
