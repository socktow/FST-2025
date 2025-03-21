import Image from "next/image";

const TimerDisplay = ({ timer, title }) => {
  if (!timer) return null;

  // Xử lý đường dẫn hình ảnh, đảm bảo hợp lệ
  const imageUrl =
    timer.subType && timer.subType.startsWith("http")
      ? timer.subType
      : `http://localhost:58869/${timer.subType || "default.png"}`;

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        {timer.subType && (
          <div className="w-8 h-8 relative">
            <Image
              src={imageUrl}
              alt={timer.subType || "Unknown"}
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
        <span className="text-red-400">{timer.timeLeft}</span>{" "}
        {timer.timeLeft === "ALIVE" ? "" : "sec"}
      </p>
    </div>
  );
};

export default TimerDisplay;
