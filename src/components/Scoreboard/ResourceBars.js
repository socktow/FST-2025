import { processPlayerStats } from "../../service/scoreboardService";

export default function ResourceBars({ player, isDead, isReversed = false }) {
  const { healthPercentage, manaPercentage, resourceType, resourceGradient } = processPlayerStats(player);

  const containerStyle = {
    transform: isReversed ? 'scaleX(-1)' : 'none'
  };

  const barStyle = {
    filter: isDead ? "grayscale(100%)" : "none"
  };

  return (
    <div className="flex flex-col gap-1 w-20" style={containerStyle}>
      <div className="w-full h-2">
        <div
          className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all ease-in-out duration-300"
          style={{
            width: `${healthPercentage}%`,
            ...barStyle
          }}
        ></div>
      </div>
      {resourceType !== "none" && (
        <div className="w-full h-2">
          <div
            className={`h-full ${resourceGradient} transition-all ease-in-out duration-300`}
            style={{
              width: `${manaPercentage}%`,
              ...barStyle
            }}
          ></div>
        </div>
      )}
    </div>
  );
} 