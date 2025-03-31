"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import Scoreboard from "./Scoreboard";
import Timer from "./Timer";
import Scoreboardbottom from "./Scoreboardbottom";

export default function InGame() {
  const [scoreboard, setScoreboard] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [teamData, setTeamData] = useState(null);
  const [baronTimer, setBaronTimer] = useState(null);
  const [dragonTimer, setDragonTimer] = useState(null);
  const [playersdata, setPlayersdata] = useState([]);
  const [players, setPlayers] = useState([]);

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
        setBaronTimer(parsedData.baronTimer);
        setDragonTimer(parsedData.dragonTimer);
        setPlayersdata(parsedData.playersdata);
        setPlayers(parsedData.players);
      }
    });

    return () => disconnectWebSocket();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 p-4">
        <Scoreboard 
          scoreboard={scoreboard} 
          gameTime={gameTime} 
          teamData={teamData}
        />
      </div>
      <Timer 
        baronTimer={baronTimer}
        dragonTimer={dragonTimer}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
        <Scoreboardbottom playersdata={playersdata} players={players} />
      </div>
    </div>
  );
}
