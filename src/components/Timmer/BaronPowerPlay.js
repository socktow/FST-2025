const BaronPowerPlay = ({ scoreboard }) => {
  if (!scoreboard || scoreboard.length < 2) return null;

  const blueTeam = scoreboard[0];
  const redTeam = scoreboard[1];
  if (!blueTeam.baronPowerPlay && !redTeam.baronPowerPlay) return null;

  const formatTime = (timeLeft) => {
    if (!timeLeft) return "0:00";
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const hasBluePowerPlay = blueTeam.baronPowerPlay && blueTeam.baronPowerPlay.gold && blueTeam.baronPowerPlay.timeLeft;
  const hasRedPowerPlay = redTeam.baronPowerPlay && redTeam.baronPowerPlay.gold && redTeam.baronPowerPlay.timeLeft;

  if (!hasBluePowerPlay && !hasRedPowerPlay) return null;

  return (
    <div className="relative w-[140px]">
      <div className="absolute flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 px-2 py-2 rounded-full relative z-10">
        {hasBluePowerPlay && (
          <div className="flex items-center gap-1">
            <span className="text-blue-500 font-bold">BLU</span>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-semibold">{formatTime(blueTeam.baronPowerPlay.timeLeft)}</span>
              <span className="text-white text-sm font-semibold">1500</span>
            </div>
          </div>
        )}
        {hasRedPowerPlay && (
          <div className="flex items-center gap-1">
            <span className="text-red-500 font-bold">RED</span>
            <div className="flex flex-col items-center">
              <span className="text-white text-2xl font-semibold">{formatTime(redTeam.baronPowerPlay.timeLeft)}</span>
              <span className="text-white text-sm font-semibold">1500</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaronPowerPlay;