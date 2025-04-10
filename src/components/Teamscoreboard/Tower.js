import React, { useMemo } from "react";

export default function Tower({ count = 0, isBlueTeam = false, fullScoreboard = [] }) {
  const isLeading = useMemo(() => {
    if (fullScoreboard.length === 2) {
      const blueTowers = fullScoreboard[0]?.towers || 0;
      const redTowers = fullScoreboard[1]?.towers || 0;
      return isBlueTeam ? blueTowers > redTowers : redTowers > blueTowers;
    }
    return false;
  }, [fullScoreboard, isBlueTeam]);

  const baseColor = isBlueTeam ? "#3c5069" : "#693c3c";
  const highlightColor = isBlueTeam ? "#60a5fa" : "#f87171";

  return (
    <div
      className={`flex items-center justify-center gap-2 text-white font-bold border-b-4 m-1 h-8`}
      style={{
        borderColor: isLeading ? highlightColor : baseColor,
      }}
    >
      <span>{count}</span>
    </div>
  );
}
