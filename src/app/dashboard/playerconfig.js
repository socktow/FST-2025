import React, { useState } from 'react';

const PlayerConfig = ({ players }) => {
  const [editedPlayers, setEditedPlayers] = useState(Array.isArray(players) ? [...players] : []);
  
  // Check if players is an array before slicing
  const blueTeam = Array.isArray(editedPlayers) ? editedPlayers.slice(0, 5) : [];
  const redTeam = Array.isArray(editedPlayers) ? editedPlayers.slice(5, 10) : [];

  const handleNameChange = (index, newName) => {
    const updatedPlayers = [...editedPlayers];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      playerName: newName
    };
    setEditedPlayers(updatedPlayers);
  };

  const handleSaveAll = () => {
    // Here you can add logic to save all player names to your backend or state management system
    console.log('Saving all players:', editedPlayers);
  };

  const renderPlayer = (player, index) => {
    if (!player) {
      return null;
    }

    return (
      <div key={player.playerName} className="mb-4 p-3 bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold">{player.playerName}</span>
            <span className="text-blue-400">{player.champion}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="flex-1 px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter player name"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <div className="grid grid-cols-2 gap-4">
        {/* Blue Team */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Blue Team</h3>
          <div className="space-y-2">
            {blueTeam.map((player, index) => renderPlayer(player, index))}
          </div>
        </div>

        {/* Red Team */}
        <div>
          <h3 className="text-lg font-semibold text-red-400 mb-4">Red Team</h3>
          <div className="space-y-2">
            {redTeam.map((player, index) => renderPlayer(player, index + 5))}
          </div>
        </div>
      </div>
      
      {/* Save All Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSaveAll}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default PlayerConfig;