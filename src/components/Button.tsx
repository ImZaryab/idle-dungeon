interface ButtonProps {
  text: string;
  handleClick: () => void;
}

const Button = ({ text, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="group relative hover:cursor-pointer"
    >
      {/* DEFAULT STATE */}
      <svg
        className="group-hover:hidden"
        width={48 * 3}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -0.5 48 16"
        shape-rendering="crispEdges"
      >
        <metadata>
          Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
        </metadata>
        <path
          stroke="#0d9068"
          d="M1 0h46M0 1h1M47 1h1M0 2h1M47 2h1M0 3h1M47 3h1M0 4h1M47 4h1M0 5h1M47 5h1M0 6h1M47 6h1M0 7h1M47 7h1M0 8h1M47 8h1M0 9h1M47 9h1M0 10h1M47 10h1M0 11h1M47 11h1M0 12h1M47 12h1M0 13h48M0 14h1M47 14h1M1 15h46"
        />
        <path
          stroke="#ecddc0"
          d="M1 1h46M1 2h46M1 3h46M1 4h46M1 5h46M1 6h46M1 7h46M1 8h46M1 9h46M1 10h46M1 11h46M1 12h46M1 14h46"
        />
      </svg>

      {/* PRESSED STATE */}
      <svg
        className="hidden group-hover:block"
        width={48 * 3}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -0.5 48 16"
        shape-rendering="crispEdges"
      >
        <metadata>
          Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
        </metadata>
        <path
          stroke="#0d9068"
          d="M1 2h46M0 3h1M47 3h1M0 4h1M47 4h1M0 5h1M47 5h1M0 6h1M47 6h1M0 7h1M47 7h1M0 8h1M47 8h1M0 9h1M47 9h1M0 10h1M47 10h1M0 11h1M47 11h1M0 12h1M47 12h1M0 13h1M47 13h1M0 14h1M47 14h1M1 15h46"
        />
        <path
          stroke="#ecddc0"
          d="M1 3h46M1 4h46M1 5h46M1 6h46M1 7h46M1 8h46M1 9h46M1 10h46M1 11h46M1 12h46M1 13h46M1 14h46"
        />
      </svg>

      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:pt-4">
        {text}
      </h3>
    </button>
  );
};

export default Button;
