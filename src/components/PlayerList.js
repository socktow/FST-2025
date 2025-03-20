const PlayerList = ({ players }) => {
    return (
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold">Player Champions</h3>
        <ul className="list-disc pl-5">
          {players.map((player, index) => (
            <li key={index} className="text-yellow-400">
              {player.playerName} - {player.champion} - Heal: {player.health} - Mana: {player.mana}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PlayerList;
  