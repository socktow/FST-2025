import Image from 'next/image';

const getBackgroundColor = (timer) => {
  if (!timer || !timer.subType) return "bg-black/40";

  const subtype = timer.subType.toLowerCase();

  if (subtype.includes('baron')) return 'bg-purple-600'; // Baron màu tím

  if (subtype.includes('dragon')) {
    if (subtype.includes('fire')) return 'bg-orange-600';     // Rồng Lửa
    if (subtype.includes('air')) return 'bg-gray-400';        // Rồng Gió
    if (subtype.includes('chemtech')) return 'bg-green-700';  // Rồng Hóa Kỹ
    if (subtype.includes('earth')) return 'bg-yellow-800';    // Rồng Đất
    if (subtype.includes('hextech')) return 'bg-cyan-600';    // Rồng Công Nghệ
    if (subtype.includes('water')) return 'bg-lime-400';      // Rồng Nước
    if (subtype.includes('elder')) return 'bg-pink-600';      // Rồng Ngàn Tuổi
    return 'bg-black/40'; // fallback nếu không khớp
  }

  return 'bg-black/40';
};

const TimerItem = ({ timer }) => {
  if (!timer) return null;

  const imageUrl = timer.subType && timer.subType.startsWith("http")
    ? timer.subType
    : `http://localhost:58869/${timer.subType || "default.png"}`;

  const [minutes, seconds] = timer.timeLeft.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;

  const bgColor = getBackgroundColor(timer);

  return (
    <div className={`flex items-center gap-2 ${bgColor} px-3 py-2 rounded-lg`}>
      <div className="w-6 h-6 relative">
        <Image
          src={imageUrl}
          alt={timer.subType || "Unknown"}
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <div className="text-lg font-bold">
        {totalSeconds <= 0 ? (
          <span className="text-white">LIVE</span>
        ) : (
          <span className="text-white">{timer.timeLeft}</span>
        )}
      </div>
    </div>
  );
};

const Timer = ({ gameTime, baronTimer, dragonTimer, atakhanTimer }) => {
  const gameTimeInSeconds = typeof gameTime === 'string' 
    ? parseInt(gameTime.split(':')[0]) * 60 + parseInt(gameTime.split(':')[1]) 
    : gameTime;

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <TimerItem timer={baronTimer} />
      <TimerItem timer={dragonTimer} />
      {gameTimeInSeconds >= 900 && (
        <TimerItem timer={atakhanTimer} />
      )}
    </div>
  );
};

export default Timer;
