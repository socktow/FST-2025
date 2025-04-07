import React, { useState, useEffect } from "react";
import { playerConfigApi } from "../../api/api";

const PlayerConfig = ({ players }) => {
  const [editedPlayers, setEditedPlayers] = useState([]);
  const [customNames, setCustomNames] = useState({});
  const [playerConfig, setPlayerConfig] = useState([]);
  const [playerTypes, setPlayerTypes] = useState({}); // ✅ State mới

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
      setCustomNames(
        config.reduce((acc, item) => {
          acc[item.id] = item.CustomName;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Failed to fetch player config:", error);
    }
  };

  const handleNameChange = (index, newName) => {
    setCustomNames((prev) => ({ ...prev, [index]: newName }));
  };

  const handlePlayerTypeChange = (index, type) => {
    setPlayerTypes((prev) => ({ ...prev, [index]: type }));
  };

  const saveCustomNames = async (data) => {
    try {
      const result = await playerConfigApi.update(data);
      if (result) {
        alert("✅ Custom names saved successfully!");
        fetchPlayerConfig();
      } else {
        alert("❌ Failed to save custom names.");
      }
    } catch (error) {
      alert("❌ Error saving custom names.");
    }
  };

  const handleSaveAll = () => {
    const updatedData = Object.entries(customNames).map(([id, CustomName]) => ({
      id: Number(id),
      CustomName: CustomName || "",
    }));
    saveCustomNames(updatedData);
  };

  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset all custom names?"))
      return;
    try {
      const result = await playerConfigApi.reset();
      if (result.success) {
        setCustomNames({});
        setPlayerTypes({});
        await fetchPlayerConfig();
        alert("✅ " + result.message);
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      alert("❌ An unexpected error occurred while resetting names.");
    }
  };

  const handleSwapNames = () => {
    const newCustomNames = { ...customNames };
    for (let i = 0; i < 5; i++) {
      [newCustomNames[i], newCustomNames[i + 5]] = [
        newCustomNames[i + 5],
        newCustomNames[i],
      ];
    }
    setCustomNames(newCustomNames);
    alert("🔄 Custom names swapped! - Please save all changes to apply.");
  };

  const renderPlayerInput = (player, index) => {
    if (!player) return null;
    const customName = customNames[index] || "";
    const showCustomName = customName.trim() !== "";
    const playerType = playerTypes[index] || "NONE";

    return (
      <div key={index} className="mb-4 p-3 bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-yellow-400 font-semibold">
                {showCustomName ? customName : player.playerName}
              </span>

              {showCustomName && (
                <span className="text-xs text-gray-400">
                  Old: {player.playerName} - New: {customName}
                </span>
              )}
            </div>
            <span className="text-blue-400">{player.champion}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="flex-1 px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter custom name"
              value={customName}
            />
            <select
              value={playerType}
              onChange={(e) => handlePlayerTypeChange(index, e.target.value)}
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="NONE" className="text-gray-400">NONE</option>
              <option value="STREAMMER" className="text-red-400 text-bold">STREAMMER</option>
              <option value="PRO" className="text-blue-400 text-bold">PRO</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">
            Blue Team
          </h3>
          <div className="space-y-2">
            {editedPlayers
              .slice(0, 5)
              .map((player, index) => renderPlayerInput(player, index))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-400 mb-4">Red Team</h3>
          <div className="space-y-2">
            {editedPlayers
              .slice(5, 10)
              .map((player, index) => renderPlayerInput(player, index + 5))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
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
