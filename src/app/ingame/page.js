"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import Scoreboard from "./Scoreboard";

export default function InGame() {
  const [scoreboard, setScoreboard] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [teamData, setTeamData] = useState(null);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setTeamData(data.matchData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    connectWebSocket((rawData) => {
      const parsedData = parseGameData(rawData);
      if (parsedData) {
        setScoreboard(parsedData.scoreboard);
        setGameTime(parsedData.gameTime);
      }
    });

    return () => disconnectWebSocket();
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="absolute top-0 left-0 p-4">
        <Scoreboard 
          scoreboard={scoreboard} 
          gameTime={gameTime} 
          teamData={teamData}
        />
      </div>
    </div>
  );
}
