import { useEffect, useState } from "react";

interface ProgressBarProps {
  currValue: number;
  totalValue: number;
  color: "yellow" | "blue" | "green";
  title?: string;
}

const ProgressBar = ({
  currValue,
  totalValue,
  color,
  title,
}: ProgressBarProps) => {
  const [percentage, setPercentage] = useState<number>(0);
  useEffect(() => {
    setPercentage((currValue / totalValue) * 100);
  }, [currValue, totalValue]);
  return (
    <div
      className={`relative w-60 h-10 flex justify-center items-center outline outline-4 outline-black ${
        color === "green" && "bg-green-900"
      } ${color === "yellow" && "bg-amber-800"} ${
        color === "blue" && "bg-blue-900"
      }`}
    >
      <p style={{ fontSize: "1.25rem", zIndex: 10 }}>
        {title && title + ":"} {currValue}/{totalValue}
      </p>
      <div
        className={`absolute top-0 left-0 ${
          color === "green" && "bg-green-500"
        } ${color === "yellow" && "bg-amber-400"} ${
          color === "blue" && "bg-blue-400"
        } ${
          percentage === 100 ? "w-full" : `w-[${percentage.toString()}%]`
        } h-10`}
      />
    </div>
  );
};

export default ProgressBar;
