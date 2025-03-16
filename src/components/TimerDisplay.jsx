import Image from "next/image";
import { convertTimer } from "@/service/convertnumber";
import { convertImagePath } from "@/service/imageservice";

const TimerDisplay = ({ timer, title }) => {
  if (!timer) return null;

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        {timer.subType && (
          <div className="w-8 h-8 relative">
            <Image
              src={convertImagePath(timer.subType)}
              alt={timer.subType}
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
        )}
        <p>
          Type:{" "}
          <span className="text-blue-400">
            {timer.subType?.split("/").pop()?.replace(".png", "") || "Unknown"}
          </span>
        </p>
      </div>
      <p>
        Time Left:{" "}
        <span className="text-red-400">{convertTimer(timer.timeLeft)}</span>{" "}
        {convertTimer(timer.timeLeft) === "ALIVE" ? "" : "sec"}
      </p>
    </div>
  );
};

export default TimerDisplay;
