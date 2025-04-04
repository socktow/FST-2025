import React, { useState, useEffect } from "react";
import { playerConfigApi } from "../api/api";

const PlayerConfig = ({ players }) => {
  const [editedPlayers, setEditedPlayers] = useState([]);
  const [customNames, setCustomNames] = useState({});
  const [playerConfig, setPlayerConfig] = useState([]);

  useEffect(() => {
    fetchPlayerConfig();
  }, []);

  useEffect(() => {
    if (Array.isArray(players)) {
      setEditedPlayers([...players]);
    }
  }, [players]);

  const fetchPlayerConfig = async () => {
    try {
      const config = await playerConfigApi.getAll();
      setPlayerConfig(config);
      const namesMap = {};
      config.forEach(item => {
        namesMap[item.id] = item.CustomName;
      });
      setCustomNames(namesMap);
    } catch (error) {
      console.error("Failed to fetch player config:", error);
    }
  };

  const handleNameChange = (index, newName) => {
    setCustomNames(prev => ({
      ...prev,
      [index]: newName,
    }));
  };

  const handleSaveAll = async () => {
    const updatedData = Object.entries(customNames).map(([id, CustomName]) => ({
      id: Number(id),
      CustomName: CustomName || "",
    }));

    try {
      const result = await playerConfigApi.update(updatedData);
      if (result) {
        console.log("Custom names saved successfully");
        alert("✅ Custom names saved successfully!");
        fetchPlayerConfig(); // Refresh the player config after save
      } else {
        console.error("Failed to save custom names");
        alert("❌ Failed to save custom names.");
      }
    } catch (error) {
      console.error("Error saving custom names:", error);
      alert("❌ Error saving custom names.");
    }
  };

  const handleReset = async () => {
    // Confirm before reset
    if (!window.confirm("Are you sure you want to reset all custom names?")) {
      return;
    }

    try {
      const result = await playerConfigApi.reset();
      
      if (result.success) {
        // Clear local state
        setCustomNames({});
        // Fetch fresh data
        await fetchPlayerConfig();
        alert("✅ " + result.message);
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      console.error("Error resetting names:", error);
      alert("❌ An unexpected error occurred while resetting names.");
    }
  };
  
  const handleSwapNames = () => {
    const newCustomNames = { ...customNames };

    // Swap the custom names (1 ↔ 6, 2 ↔ 7, etc.)
    for (let i = 0; i < 5; i++) {
      const temp = newCustomNames[i];
      newCustomNames[i] = newCustomNames[i + 5];
      newCustomNames[i + 5] = temp;
    }

    setCustomNames(newCustomNames);
    alert("🔄 Custom names swapped! - Please save all changes to apply.");
  };

  const renderPlayer = (player, index) => {
    if (!player) return null;

    const currentCustomName = customNames[index] || "";
    const showCustomName = currentCustomName.trim() !== "";

    return (
      <div key={index} className="mb-4 p-3 bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-yellow-400 font-semibold">
                {showCustomName ? currentCustomName : player.playerName}
              </span>
              {showCustomName && (
                <span className="text-xs text-gray-400">
                  Old: {player.playerName} - New: {currentCustomName}
                </span>
              )}
            </div>
            <span className="text-blue-400">{player.champion}</span>
          </div>
          <input
            type="text"
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="flex-1 px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter custom name"
            value={customNames[index] || ""}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Blue Team</h3>
          <div className="space-y-2">
            {editedPlayers.slice(0, 5).map((player, index) => renderPlayer(player, index))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-400 mb-4">Red Team</h3>
          <div className="space-y-2">
            {editedPlayers.slice(5, 10).map((player, index) => renderPlayer(player, index + 5))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleSaveAll}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Save All Changes
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Reset Names
        </button>
        <button
          onClick={handleSwapNames}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Swap Custom Names
        </button>
      </div>
    </div>
  );
};

export default PlayerConfig;
