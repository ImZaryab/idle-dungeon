interface ButtonProps {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, handleClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="group relative hover:cursor-pointer"
    >
      {/* DEFAULT STATE */}
      <svg
        className="group-hover:hidden"
        width={64 * 2}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -0.5 64 16"
        shapeRendering="crispEdges"
      >
        <metadata>
          Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
        </metadata>
        <path
          stroke="#1f1815"
          d="M1 0h62M0 1h2M62 1h2M0 2h1M63 2h1M0 3h1M63 3h1M0 4h1M63 4h1M0 5h1M63 5h1M0 6h1M63 6h1M0 7h1M63 7h1M0 8h1M63 8h1M0 9h1M63 9h1M0 10h1M63 10h1M0 11h1M63 11h1M0 12h1M63 12h1M0 13h2M62 13h2M0 14h64M1 15h62"
        />
        <path
          stroke="#a66a40"
          d="M2 1h60M1 2h2M61 2h2M1 3h1M62 3h1M1 4h1M62 4h1M1 5h1M62 5h1M1 6h1M62 6h1M1 7h1M62 7h1"
        />
        <path
          stroke="#643a27"
          d="M3 2h58M2 3h60M2 4h60M2 5h60M2 6h60M2 7h60M2 8h60M2 9h60M2 10h60M2 11h60M2 12h60"
        />
        <path stroke="#986039" d="M1 8h1M62 8h1" />
        <path stroke="#905a35" d="M1 9h1M62 9h1" />
        <path stroke="#885430" d="M1 10h1M62 10h1" />
        <path stroke="#774929" d="M1 11h1M62 11h1" />
        <path stroke="#6b4124" d="M1 12h1M62 12h1" />
        <path stroke="#4b2d23" d="M2 13h60" />
      </svg>

      {/* PRESSED STATE */}
      <svg
        width={64 * 2}
        className="hidden group-hover:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -0.5 64 16"
        shapeRendering="crispEdges"
      >
        <metadata>
          Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
        </metadata>
        <path
          stroke="#1f1815"
          d="M1 2h62M0 3h2M62 3h2M0 4h1M63 4h1M0 5h1M63 5h1M0 6h1M63 6h1M0 7h1M63 7h1M0 8h1M63 8h1M0 9h1M63 9h1M0 10h1M63 10h1M0 11h1M63 11h1M0 12h1M63 12h1M0 13h1M63 13h1M0 14h2M62 14h2M1 15h62"
        />
        <path
          stroke="#a66a40"
          d="M2 3h60M1 4h2M61 4h2M1 5h1M62 5h1M1 6h1M62 6h1M1 7h1M62 7h1M1 8h1M62 8h1"
        />
        <path
          stroke="#643a27"
          d="M3 4h58M2 5h60M2 6h60M2 7h60M2 8h60M2 9h60M2 10h60M2 11h60M2 12h60M2 13h60"
        />
        <path stroke="#986039" d="M1 9h1M62 9h1" />
        <path stroke="#905a35" d="M1 10h1M62 10h1" />
        <path stroke="#885430" d="M1 11h1M62 11h1" />
        <path stroke="#774929" d="M1 12h1M62 12h1" />
        <path stroke="#6b4124" d="M1 13h1M62 13h1" />
        <path stroke="#4b2d23" d="M2 14h60" />
      </svg>

      <h4 className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:pt-2">
        {text}
      </h4>
    </button>
  );
};

export default Button;
