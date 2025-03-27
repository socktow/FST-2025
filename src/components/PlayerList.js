const PlayerList = ({ players, playersdata = [] }) => {
  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <h3 className="text-lg font-semibold">Player Champions</h3>
      <ul className="list-disc pl-5">
        {players.map((player, index) => {
          const playerData = playersdata.find(p => p.champion === player.champion);

          return (
            <li key={index} className="text-yellow-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{player.playerName}</span>
                <span className="text-blue-400">{player.champion}</span>
                <span className="text-red-400">HP: {player.health}</span>
                <span className="text-blue-400">MP: {player.mana}</span>
              </div>
              {playerData && (
                <div className="ml-4 mt-1 text-green-400">
                  <span className="mr-2">Level: {playerData.level}</span>
                  <span className="mr-2">Gold: {playerData.totalGold}</span>
                  <span className="mr-2">KDA: {playerData.kills}/{playerData.deaths}/{playerData.assists}</span>
                  <span className="mr-2">CS: {playerData.creepScore}</span>
                  <span className="mr-2">Shutdown: {playerData.shutdown}</span>
                  <span className="mr-2">Respawn: {playerData.respawnTimeRemaining}</span>
                  <span>Vision: {playerData.visionScore}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlayerList;
