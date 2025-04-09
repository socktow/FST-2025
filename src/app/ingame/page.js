"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import Scoreboard from "./Scoreboard";
import Scoreboardbottom from "./Scoreboardbottom";
import UnderScoreboard from "./UnderScoreboard";
import Timer from "./Timer";
import KillFeed from "./KillFeed";
export default function InGame() {
  const [scoreboard, setScoreboard] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [teamData, setTeamData] = useState(null);
  const [baronTimer, setBaronTimer] = useState(null);
  const [dragonTimer, setDragonTimer] = useState(null);
  const [atakhanTimer, setAtakhanTimer] = useState(null);
  const [playersdata, setPlayersdata] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    connectWebSocket((rawData) => {
      const parsedData = parseGameData(rawData);
      if (parsedData) {
        setScoreboard(parsedData.scoreboard);
        setGameTime(parsedData.gameTime);
        setBaronTimer(parsedData.baronTimer);
        setDragonTimer(parsedData.dragonTimer);
        setAtakhanTimer(parsedData.atakhanTimer);
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
        <div className="relative top-0 right-0 p-4">
{/* 
        <UnderScoreboard /> */}
        </div>
      </div>
      <div className="top-0 right-0 flex flex-col gap-4 p-12">
      <Timer
        gameTime={gameTime}  
        baronTimer={baronTimer}
        dragonTimer={dragonTimer}
        atakhanTimer={atakhanTimer}
      />
      {/* <KillFeed /> */}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
        <Scoreboardbottom playersdata={playersdata} players={players} />
      </div>
    </div>
  );
}
