import { useMemo } from "react";
import Image from "next/image";
import { getLightColor, calculateProgress } from "./utils";
import BaronPowerPlay from "./BaronPowerPlay";

const Barontime = ({ timer }) => {
  const progress = calculateProgress(timer);
  const strokeColor = useMemo(() => getLightColor("baron"), ["baron"]);

  if (!timer) return null;

  const [minutes, seconds] = timer.timeLeft?.split(":").map(Number) || [0, 0];
  const totalSeconds = minutes * 60 + seconds;

  const imageUrl = timer.subType?.startsWith("http")
    ? timer.subType
    : `http://localhost:58869/${timer.subType || "default.png"}`;

  return (
    <div className="relative">
      {/* Main content */}
      <div className="absolute flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 px-2 py-2 rounded-full relative z-10">
        <div className="relative w-8 h-8">
          <svg
            className="absolute top-0 left-0 w-8 h-8 -rotate-90"
            viewBox="0 0 8 8"
          >
            <circle
              stroke={strokeColor}
              strokeWidth="1"
              fill="transparent"
              r="3.4"
              cx="4"
              cy="4"
              strokeDasharray="22"
              strokeDashoffset={
                (1 - (progress < 0 ? 1 : Math.min(progress, 1))) * (22.5 - 1) +
                1
              }
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              src={imageUrl}
              alt={timer.subType || "Unknown"}
              width={15}
              height={15}
              className="object-contain"
              style={{ filter: "brightness(1.3)" }}
            />
          </div>
        </div>
        {totalSeconds > 0 && (
          <div className="text-lg font-bold text-white">{timer.timeLeft}</div>
        )}
      </div>
    </div>
  );
};

export default Barontime;
