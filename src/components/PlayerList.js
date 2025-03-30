import React, { useState } from 'react';
import Image from 'next/image';

const PlayerList = ({ players, playersdata = [] }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItems = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Chia players thành 2 đội
  const blueTeam = players.slice(0, 5);
  const redTeam = players.slice(5, 10);

  const renderPlayer = (player, index) => {
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
          <>
            <div className="ml-4 mt-1 text-green-400">
              <span className="mr-2">Level: {playerData.level}</span>
              <span className="mr-2">Gold: {playerData.totalGold}</span>
              <span className="mr-2">KDA: {playerData.kills}/{playerData.deaths}/{playerData.assists}</span>
              <span className="mr-2">CS: {playerData.creepScore}</span>
              <span className="mr-2">Shutdown: {playerData.shutdown}</span>
              <span className="mr-2">Respawn: {playerData.respawnTimeRemaining}</span>
              <span>Vision: {playerData.visionScore}</span>
            </div>
            <div className="ml-4 mt-1">
              <button 
                onClick={() => toggleItems(index)}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>{expandedItems[index] ? '▼' : '▶'}</span>
                Items ({playerData.items?.length || 0})
              </button>
              {expandedItems[index] && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(index < 5 ? [...playerData.items].reverse() : playerData.items)?.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="relative w-12 h-12 border-2 border-gray-600 rounded-md"
                    >
                      <Image
                        src={`http://localhost:58869/${item.asset}`}
                        alt={item.displayName}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </li>
    );
  };

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <div className="grid grid-cols-2 gap-4">
        {/* Blue Team */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400">Blue Team</h3>
          <ul className="list-disc pl-5">
            {blueTeam.map((player, index) => renderPlayer(player, index))}
          </ul>
        </div>

        {/* Red Team */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">Red Team</h3>
          <ul className="list-disc pl-5">
            {redTeam.map((player, index) => renderPlayer(player, index + 5))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
