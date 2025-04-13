import Image from "next/image";

const TimerItem = ({ timer, children }) => {
  if (!timer) return null;

  const [minutes, seconds] = timer.timeLeft?.split(":").map(Number) || [0, 0];
  const totalSeconds = minutes * 60 + seconds;

  const imageUrl = timer.subType?.startsWith("http")
    ? timer.subType
    : `http://localhost:58869/${timer.subType || "default.png"}`;

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 px-2 py-2 rounded-full">
      <div className="relative w-8 h-8">
        {children}
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
  );
};

export default TimerItem;
