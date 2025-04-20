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

  const formatGold = (gold) => {
    return Math.floor(gold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const hasBluePowerPlay = blueTeam.baronPowerPlay && blueTeam.baronPowerPlay.gold && blueTeam.baronPowerPlay.timeLeft;
  const hasRedPowerPlay = redTeam.baronPowerPlay && redTeam.baronPowerPlay.gold && redTeam.baronPowerPlay.timeLeft;

  if (!hasBluePowerPlay && !hasRedPowerPlay) return null;

  return (
    <div className="relative w-[160px]">
      <div className="absolute flex flex-col gap-1.5 bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 rounded-full relative z-10 shadow-lg">
        {hasBluePowerPlay && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-blue-500 font-bold text-base">BLU</span>
            <div className="flex flex-col items-center">
              <span className="text-white text-xl font-semibold">{formatTime(blueTeam.baronPowerPlay.timeLeft)}</span>
              <span className="text-yellow-400 text-xs font-semibold">{formatGold(blueTeam.baronPowerPlay.gold)}</span>
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
          </div>
        )}
        {hasRedPowerPlay && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-red-500 font-bold text-base">RED</span>
            <div className="flex flex-col items-center">
              <span className="text-white text-xl font-semibold">{formatTime(redTeam.baronPowerPlay.timeLeft)}</span>
              <span className="text-yellow-400 text-xs font-semibold">{formatGold(redTeam.baronPowerPlay.gold)}</span>
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaronPowerPlay;