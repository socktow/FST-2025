import React, { useEffect, useMemo } from "react";

export default function Gold({ value = "0", isBlueTeam = false, fullScoreboard = [] }) {
  const isLeading = useMemo(() => {
    if (fullScoreboard.length === 2) {
      const blueGold = fullScoreboard[0]?.gold || 0;
      const redGold = fullScoreboard[1]?.gold || 0;
      return isBlueTeam ? blueGold > redGold : redGold > blueGold;
    }
    return false;
  }, [fullScoreboard, isBlueTeam]);

  const baseColor = isBlueTeam ? "#3c5069" : "#693c3c";
  const highlightColor = isBlueTeam ? "#60a5fa" : "#f87171"; 

  return (
    <div
      className={`flex items-center justify-center gap-1 text-white font-bold 
        border-b-2 m-1 h-8`}
      style={{
        borderColor: isLeading ? highlightColor : baseColor,
      }}
    >
      <span>{value}</span>
    </div>
  );
}
