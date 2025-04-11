import { useMemo } from "react";
import Image from "next/image";
import { getBackgroundColor, getLightColor, calculateProgress } from "./utils";

const TimerItem = ({ timer }) => {
  const bgColor = getBackgroundColor(timer);
  const strokeColor = useMemo(() => getLightColor(bgColor), [bgColor]);
  const progress = calculateProgress(timer);

  if (!timer) return null;

  const imageUrl = timer.subType?.startsWith("http")
    ? timer.subType
    : `http://localhost:58869/${timer.subType || "default.png"}`;

  const [minutes, seconds] = timer.timeLeft?.split(":").map(Number) || [0, 0];
  const totalSeconds = minutes * 60 + seconds;

  const renderProgressCircle = () => {
    const subtype = timer.subType?.toLowerCase() || '';
    if (subtype.includes('dragon') || subtype.includes('baron') || subtype.includes('atakhan')) {
      return (
        <svg
          className="absolute top-0 left-0 w-8 h-8 -rotate-90"
          viewBox="0 0 8 8"
        >
          <circle
            stroke={strokeColor}
            strokeWidth="1"
            fill="transparent"
            r="3.5"
            cx="4"
            cy="4"
            strokeDasharray="22"
            strokeDashoffset={(1 - (progress < 0 ? 1 : Math.min(progress, 1))) * (22.5 - 1) + 1}
            strokeLinecap="round"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex items-center gap-2 ${bgColor} px-3 py-2 rounded-full`}
    >
      <div className="relative w-8 h-8">
        {renderProgressCircle()}

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src={imageUrl}
            alt={timer.subType || "Unknown"}
            width={20}
            height={20}
            className="object-contain"
            style={{ filter: "brightness(1.5)" }}
          />
        </div>
      </div>

      {totalSeconds <= 0 ? null : (
        <div className="text-sm font-bold text-white">{timer.timeLeft}</div>
      )}
    </div>
  );
};

export default TimerItem;
