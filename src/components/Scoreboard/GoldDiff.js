import {
  calculateGoldDiff,
  getDiffColor,
  getLineColor,
  formatDiff,
} from "../../service/goldService";

export default function GoldDiff({ blueTeamData, redTeamData, playersdata }) {
  const { playerDiffs } = calculateGoldDiff(blueTeamData, redTeamData, playersdata);

  return (
    <div className="w-[70px] h-full bg-block-500/20">
      <div className="h-full flex flex-col justify-between py-2">
        {playerDiffs.map((playerDiff, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-[100px]">
              <div
                className={`text-[18px] font-semibold ${getDiffColor(
                  playerDiff.diff
                )}`}
                dangerouslySetInnerHTML={{
                  __html: formatDiff(playerDiff.diff),
                }}
              />
            </div>
            <div
              className={`h-[3px] w-[60%] mt-1 ${getLineColor(
                playerDiff.diff
              )}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 