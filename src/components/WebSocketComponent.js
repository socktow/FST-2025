"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
// import PlayerList from "@/components/PlayerList";
// import TimerDisplay from "@/components/TimerDisplay";
// import Scoreboard from "@/components/Scoreboard";

export default function WebSocketComponent() {
  // const [gameStatus, setGameStatus] = useState("Waiting...");
  // const [gameTime, setGameTime] = useState(0);
  // const [baronTimer, setBaronTimer] = useState(null);
  // const [dragonTimer, setDragonTimer] = useState(null);
  // const [atakhanTimer, setAtakhanTimer] = useState(null);
  // const [scoreboard, setScoreboard] = useState([]);
  // const [players, setPlayers] = useState([]);
  // const [playersdata, setPlayersdata] = useState([]);
  
  // useEffect(() => {
  //   connectWebSocket((rawData) => {
  //     const parsedData = parseGameData(rawData);
  //     if (parsedData) {
  //       setGameStatus(parsedData.gameStatus);
  //       setGameTime(parsedData.gameTime);
  //       setBaronTimer(parsedData.baronTimer);
  //       setDragonTimer(parsedData.dragonTimer);
  //       setAtakhanTimer(parsedData.atakhanTimer);
  //       setScoreboard(parsedData.scoreboard);
  //       setPlayers(parsedData.players);
  //       setPlayersdata(parsedData.playersdata);
  //     }
  //   });

  //   return () => disconnectWebSocket();
  // }, []);

  return (
    <div className="p-4 text-white bg-gray-800 rounded">
      <h2 className="text-xl font-bold">Dino League of Legends - In Game</h2>
      {/* <p className="mt-2">
        Status: <span className="text-green-400">{gameStatus}</span>
      </p>
      <p className="mt-2">
        Time: <span className="text-yellow-400">{gameTime}</span>{" "}
      </p> */}

      {/* Hiển thị danh sách người chơi */}
      {/* <PlayerList players={players} playersdata={playersdata} /> */}

      {/* Hiển thị bảng điểm số */}
      {/* <Scoreboard scoreboard={scoreboard} /> */}

      {/* Hiển thị thời gian Baron và Dragon */}
      {/* {baronTimer && <TimerDisplay timer={baronTimer} title="Baron Pit Timer" />}
      {dragonTimer && <TimerDisplay timer={dragonTimer} title="Dragon Pit Timer" />}
      {atakhanTimer && <TimerDisplay timer={atakhanTimer} title="Atakhan Timer" />} */}
    </div>
  );
}
