import { processPlayerStats } from "../../service/scoreboardService";

export default function ResourceBars({ player, isDead, isReversed = false }) {
  const { healthPercentage, manaPercentage, resourceType, resourceGradient, xpPercentage } = processPlayerStats(player);
  const containerStyle = {
    transform: isReversed ? 'scaleX(-1)' : 'none'
  };

  const barStyle = {
    filter: isDead ? "grayscale(100%)" : "none"
  };

  return (
    <div className="flex flex-col gap-1 w-20" style={containerStyle}>
      <div className="w-full h-1.75 ">
        <div
          className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all ease-in-out duration-300"
          style={{
            width: `${healthPercentage}%`,
            ...barStyle
          }}
        ></div>
      </div>
      {resourceType !== "none" && (
        <div className="w-full h-1.75">
          <div
            className={`h-full ${resourceGradient} transition-all ease-in-out duration-300`}
            style={{
              width: `${manaPercentage}%`,
              ...barStyle
            }}
          ></div>
        </div>
      )}
      <div className="w-full h-0.5">
        <div
          className="h-full bg-gradient-to-r from-purple-800 to-purple-500 transition-all ease-in-out duration-300 rounded-full"
          style={{
            width: `${xpPercentage}%`,
            ...barStyle
          }}
        ></div>
      </div>
    </div>
  );
} 