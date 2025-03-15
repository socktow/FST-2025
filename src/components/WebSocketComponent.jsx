"use client";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import { convertTimer , convertToMinutesAndSeconds } from "@/service/convertnumber";
import { convertImagePath } from "@/service/imageservice";
import Image from 'next/image';

export default function WebSocketComponent() {
  const [gameStatus, setGameStatus] = useState("Waiting...");
  const [gameTime, setGameTime] = useState(0);
  const [baronTimer, setBaronTimer] = useState(null);
  const [dragonTimer, setDragonTimer] = useState(null);
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    connectWebSocket((rawData) => {
      const parsedData = parseGameData(rawData);
      if (parsedData) {
        setGameStatus(parsedData.gameStatus);
        setGameTime(parsedData.gameTime);
        setBaronTimer(parsedData.baronTimer);
        setDragonTimer(parsedData.dragonTimer);
        setScoreboard(parsedData.scoreboard);
      }
    });

    return () => disconnectWebSocket();
  }, []);

  const TimerDisplay = ({ timer, title }) => (
    <div className="mt-4 p-3 bg-gray-700 rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        {timer.subType && (
          <div className="w-8 h-8 relative">
            <Image
              src={convertImagePath(timer.subType)}
              alt={timer.subType}
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
        )}
        <p>Type: <span className="text-blue-400">{timer.subType?.split('/').pop()?.replace('.png', '') || 'Unknown'}</span></p>
      </div>
      <p>Time Left: <span className="text-red-400">{convertTimer(timer.timeLeft)}</span> {convertTimer(timer.timeLeft) === "ALIVE" ? "" : "sec"}</p>
    </div>
  );

  return (
    <div className="p-4 text-white bg-gray-800 rounded">
      <h2 className="text-xl font-bold">Game Info</h2>
      <p className="mt-2">Status: <span className="text-green-400">{gameStatus}</span></p>
      <p className="mt-2">Time: <span className="text-yellow-400">{convertToMinutesAndSeconds(gameTime)}</span> sec</p>

      {/* Hiển thị thông tin scoreboard trong bảng */}
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <h3 className="text-lg font-semibold">Scoreboard</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-left">Gold</th>
              <th className="px-4 py-2 text-left">Kills</th>
              <th className="px-4 py-2 text-left">Towers</th>
              <th className="px-4 py-2 text-left">Grubs</th>
              <th className="px-4 py-2 text-left">Dragons</th>
              <th className="px-4 py-2 text-left">Feats of Strength</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map((team, index) => (
              <tr key={index} className="border-t border-gray-600">
                <td className="px-4 py-2">Team {index + 1}</td>
                <td className="px-4 py-2">{team.gold}</td>
                <td className="px-4 py-2">{team.kills}</td>
                <td className="px-4 py-2">{team.towers}</td>
                <td className="px-4 py-2">{team.grubs}</td>
                <td className="px-4 py-2">{team.dragons.join(', ')}</td>
                <td className="px-4 py-2">
                  <ul className="list-disc pl-5">
                    {Object.entries(team.featsOfStrength).map(([key, value]) => (
                      <li key={key}>
                        {key}: <span className="text-yellow-400">{value.toString()}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị thời gian và hình ảnh Baron */}
      {baronTimer && <TimerDisplay timer={baronTimer} title="Baron Pit Timer" />}

      {/* Hiển thị thời gian và hình ảnh Dragon */}
      {dragonTimer && <TimerDisplay timer={dragonTimer} title="Dragon Pit Timer" />}
    </div>
  );
}
