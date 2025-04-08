const parseTimeToSeconds = (timeStr) => {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  return minutes * 60 + seconds;
};

export default function Timer({ gameTime, baronTimer, dragonTimer, atakhanTimer }) {
  const displayTime = (timer) => {
    if (!timer) return null;
    const [minutes, seconds] = timer.timeLeft.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      return (
        <span className="text-lg font-bold text-red-500 animate-pulse">
          LIVE
        </span>
      );
    }

    return (
      <span className="text-2xl font-bold text-black">
        {timer.timeLeft}
      </span>
    );
  };

  // Parse gameTime string to seconds
  const gameTimeInSeconds = typeof gameTime === 'string' ? parseTimeToSeconds(gameTime) : gameTime;

  return (
    <div className="absolute top-4 right-4 flex gap-2 text-white bg-black/40 p-4 rounded-xl">
      <div>Baron: {displayTime(baronTimer)}</div>
      <div>Dragon: {displayTime(dragonTimer)}</div>
      {gameTimeInSeconds >= 900 && (
        <div>Atakhan: {displayTime(atakhanTimer)}</div>
      )}
    </div>
  );
}
