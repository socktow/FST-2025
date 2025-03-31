import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { sortPlayerItems, getItemStacks } from '../service/itemService';

const PlayerList = ({ players, playersdata = [] }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [previousItems, setPreviousItems] = useState({});
  const itemRefs = useRef({});

  useEffect(() => {
    // Cập nhật previousItems khi playersdata thay đổi
    const newPreviousItems = {};
    playersdata.forEach(player => {
      if (player.champion) {
        newPreviousItems[player.champion] = player.items || [];
      }
    });
    setPreviousItems(newPreviousItems);
  }, [playersdata]);

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
    const isBlueTeam = index < 5;
    const sortedItems = sortPlayerItems(playerData?.items, isBlueTeam);
    const prevItems = previousItems[player.champion] || [];

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
                <div className={`flex flex-wrap gap-2 mt-2 ${index < 5 ? 'flex-row-reverse justify-end' : ''}`}>
                  {sortedItems.map((item, itemIndex) => {
                    const isNewItem = !prevItems.some(prevItem => 
                      prevItem.id === item.id && prevItem.asset === item.asset
                    );
                    const isLastItem = itemIndex === sortedItems.length - 1;
                    const stacks = getItemStacks(item.stacks, isLastItem);
                    
                    return (
                      <div 
                        key={`${item.id}-${itemIndex}`}
                        ref={el => {
                          if (el && isNewItem) {
                            itemRefs.current[`${player.champion}-${item.id}`] = el;
                            el.classList.add('animate-new-item');
                            setTimeout(() => {
                              el.classList.remove('animate-new-item');
                            }, 1000);
                          }
                        }}
                        className="relative w-12 h-12 border-2 border-gray-600 rounded-md"
                      >
                      <Image
                        src={`http://localhost:58869/${item.asset}`}
                        alt={item.displayName}
                        fill
                        className="object-contain"
                        sizes="48px"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                      />
                        {stacks !== null && (
                          <div className="absolute bottom-0 right-0 bg-black bg-opacity-25 text-white text-xs rounded-bl px-1">
                            {stacks}
                          </div>
                        )}
                    </div>
                    );
                  })}
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
      <style jsx global>{`
        @keyframes newItem {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.7);
          }
        }
        .animate-new-item {
          animation: newItem 1s ease-in-out;
        }
      `}</style>
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