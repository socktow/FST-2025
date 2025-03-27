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
                <span className="font-semibold">Player {index}</span>
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

                  {/* Hiển thị danh sách trang bị (items) */}
                  {playerData.items && playerData.items.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-white font-semibold">Items:</h4>
                      <div className="flex gap-2 mt-1">
                        {playerData.items.map((item, idx) => (
                          <img
                            key={idx}
                            src={item.image} // Đường dẫn hình ảnh trang bị
                            alt={item.name} // Tên trang bị
                            title={item.name} // Tooltip khi hover vào
                            className="w-8 h-8 border border-gray-500 rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
