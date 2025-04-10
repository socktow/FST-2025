import React, { useMemo } from "react";

export default function Killpoint({ count = 0, isBlueTeam = false, fullScoreboard = [] }) {
  const isLeading = useMemo(() => {
    if (fullScoreboard.length === 2) {
      const blueKills = fullScoreboard[0]?.kills || 0;
      const redKills = fullScoreboard[1]?.kills || 0;
      return isBlueTeam ? blueKills > redKills : redKills > blueKills;
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
