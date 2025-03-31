import {
  calculateGoldDiff,
  getDiffColor,
  getLineColor,
  formatDiff,
} from "../../service/goldService";
import { splitTeams, processPlayerStats } from "../../service/scoreboardService";
import Image from "next/image";

export default function Scoreboardbottom({ playersdata = [], players = [] }) {
  const { blueTeam, redTeam, blueTeamData, redTeamData } = splitTeams(players, playersdata);

  const renderResourceBar = (player) => {
    const { manaPercentage, resourceType, resourceGradient } = processPlayerStats(player);
    if (resourceType === 'none') return null;

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
    <div className="mx-auto" style={{ width: "1260px", height: "260px" }}>
      <div className="w-full h-full bg-black backdrop-blur-sm rounded-t-lg border border-gray-800">
        <div className="w-full h-full flex justify-between">
          <div className="w-full h-full bg-black-500/20">
            <div className="h-full flex flex-col justify-between py-1">
              {blueTeam.map((player, index) => {
                const { healthPercentage } = processPlayerStats(player);

                return (
                  <div
                    key={index}
                    className="flex items-center justify-end gap-2"
                  >
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-white text-sm">
                        {player.playerName}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1 w-32 scale-x-[-1]">
                          <div className="w-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all ease-in-out duration-300"
                              style={{ width: `${healthPercentage}%` }}
                            ></div>
                          </div>
                          {renderResourceBar(player)}
                        </div>
                        <div className="w-6 h-6 bg-gray-800/50 text-white font-semibold flex items-center justify-center">
                          {player.level}
                        </div>
                        <div className="w-6 h-6 bg-gray-800/50 rounded">
                        {/* Trang Rune */}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-11.5 h-11.5 border-1 border-solid border-gray-800">
                      <Image
                        src={`http://localhost:58869/${player.championInfo.square}`}
                        alt={`${player.championInfo.name} champion icon for ${player.playerName}`}
                        fill
                        className="object-contain"
                        sizes="50px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[70px] h-full bg-block-500/20">
            <div className="h-full flex flex-col justify-between py-2">
              {(() => {
                const { playerDiffs } = calculateGoldDiff(
                  blueTeamData,
                  redTeamData,
                  playersdata
                );
                return playerDiffs.map((playerDiff, index) => (
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
                ));
              })()}
            </div>
          </div>

          <div className="w-full h-full bg-black-500/20">
            <div className="h-full flex flex-col justify-between py-1">
              {redTeam.map((player, index) => {
                const { healthPercentage } = processPlayerStats(player);

                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className="relative w-11.5 h-11.5 border-1 border-solid border-gray-800">
                      <Image
                        src={`http://localhost:58869/${player.championInfo.square}`}
                        alt={`${player.championInfo.name} champion icon for ${player.playerName}`}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-white text-sm">
                        {player.playerName}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-800/50 rounded">
                          {/* Trang Rune */}
                        </div>
                        <div className="w-6 h-6 bg-gray-800/50 text-white font-semibold flex items-center justify-center">
                          {player.level}
                        </div>
                        <div className="flex flex-col gap-1 w-32">
                          <div className="w-full h-2">
                            <div
                              className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all ease-in-out duration-300"
                              style={{ width: `${healthPercentage}%` }}
                            ></div>
                          </div>
                          {renderResourceBar(player)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
