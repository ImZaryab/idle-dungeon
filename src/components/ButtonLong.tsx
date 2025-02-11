import { Text } from "nes-ui-react";
import { ButtonHTMLAttributes } from "react";

interface IButtonLongProps {
  text: string;
  onClick: () => void;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  btnClassName?: string;
  disabled?: boolean;
}

const ButtonLong = ({
  text,
  onClick,
  props,
  btnClassName,
  disabled,
}: IButtonLongProps) => {
  return (
    <button
      disabled={disabled ?? false}
      className={`hover:cursor-pointer relative text-black disabled:cursor-not-allowed disabled:opacity-60 ${btnClassName}`}
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
