"use client";
import { useEffect, useState } from "react";
import TeamConfig from "./teamconfig/teamconfig";
import PlayerConfig from "./playerconfig/playerconfig";
import ActiveModel from "./activemodel/activemodel";
import ImageStore from "./imagestore/imagestore";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import LolPatch from "./lolpatch/lolpatch";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("team");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    connectWebSocket((rawData) => {
      const parsedData = parseGameData(rawData);
      if (parsedData) setPlayers(parsedData.players);
    });
    return () => disconnectWebSocket();
  }, []);

  const renderContent = () =>
    ({
      team: <TeamConfig />,
      player: <PlayerConfig players={players} />,
      model: <ActiveModel />,
      image: <ImageStore />,
      lolpatch: <LolPatch />,
    }[activeTab] || <TeamConfig />);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <nav className="bg-gray-800">
          <ul className="flex">
            {["team", "player", "model", "image", "lolpatch"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-white focus:outline-none transition-colors ${
                    activeTab === tab
                      ? "bg-gray-700 font-medium"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {tab === "lolpatch"
                    ? "League of Legends Patch" 
                    : `${tab.charAt(0).toUpperCase()}${tab.slice(1)} Config`
                        .replace("model Config", "Active Model")
                        .replace("image Config", "Image Store")}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 min-h-[400px]">{renderContent()}</div>
      </div>
    </div>
  );
}