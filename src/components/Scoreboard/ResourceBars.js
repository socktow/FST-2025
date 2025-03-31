import { processPlayerStats } from "../../service/scoreboardService";

export default function ResourceBars({ player, isReversed = false }) {
  const { healthPercentage, manaPercentage, resourceType, resourceGradient } = processPlayerStats(player);

  const renderResourceBar = () => {
    if (resourceType === "none") return null;

    return (
      <div className="w-full h-2">
        <div
          className={`h-full ${resourceGradient} transition-all ease-in-out duration-300`}
          style={{ width: `${manaPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-1 w-32 ${isReversed ? 'scale-x-[-1]' : ''}`}>
      <div className="w-full h-2">
        <div
          className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all ease-in-out duration-300"
          style={{ width: `${healthPercentage}%` }}
        ></div>
      </div>
      {renderResourceBar()}
    </div>
  );
} 