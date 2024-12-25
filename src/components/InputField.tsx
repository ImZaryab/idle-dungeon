import { HTMLAttributes } from "react";

interface IInputFieldProps {
  value: string;
  handleChange: (val: string) => void;
  placeHolder?: string;
  inputProps?: HTMLAttributes<HTMLInputElement>;
}

const InputField = ({
  value,
  handleChange,
  placeHolder,
  inputProps,
}: IInputFieldProps) => {
  return (
    <div className="relative text-[1.5rem]">
      <img
        src="./ui-input.svg"
        width={256}
        className="max-w-full pointer-events-none"
      />
      <input
        className="absolute top-5 left-5"
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeHolder ?? ""}
        {...inputProps}
      />
    </div>
  );
};

export default InputField;
