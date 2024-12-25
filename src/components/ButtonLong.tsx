import { Text } from "nes-ui-react";
import { ButtonHTMLAttributes } from "react";

interface IButtonLongProps {
  text: string;
  onClick: () => void;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  btnClassName?: string;
}

const ButtonLong = ({
  text,
  onClick,
  props,
  btnClassName,
}: IButtonLongProps) => {
  return (
    <button
      className={`hover:cursor-pointer relative text-black ${btnClassName}`}
      onClick={onClick}
      {...props}
    >
      <img
        src="./btn-long.svg"
        width={256}
        height={64}
        className="max-w-full pointer-events-none"
      />
      <Text
        size="xlarge"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {text}
      </Text>
    </button>
  );
};

export default ButtonLong;
