import {
  splitTeams,
  processPlayerStats,
} from "../../service/scoreboardService";
import ChampionSquare from "../../components/Scoreboard/ChampionSquare";
import RuneAndLevel from "../../components/Scoreboard/RuneAndLevel";
import GoldDiff from "../../components/Scoreboard/GoldDiff";

export default function Scoreboardbottom({ playersdata = [], players = [] }) {
  const { blueTeam, redTeam, blueTeamData, redTeamData } = splitTeams(
    players,
    playersdata
  );

  const renderResourceBar = (player) => {
    const { manaPercentage, resourceType, resourceGradient } =
      processPlayerStats(player);
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
                        <RuneAndLevel player={player} isBlueTeam={true} />
                      </div>
                    </div>
                    <ChampionSquare player={player} size="50px" />
                  </div>
                );
              })}
            </div>
          </div>

          <GoldDiff 
            blueTeamData={blueTeamData}
            redTeamData={redTeamData}
            playersdata={playersdata}
          />

          <div className="w-full h-full bg-black-500/20">
            <div className="h-full flex flex-col justify-between py-1">
              {redTeam.map((player, index) => {
                const { healthPercentage } = processPlayerStats(player);
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <ChampionSquare player={player} size="40px" />
                    <div className="flex flex-col gap-1">
                      <div className="text-white text-sm">
                        {player.playerName}
                      </div>
                      <div className="flex items-center gap-2">
                        <RuneAndLevel player={player} isBlueTeam={false} />
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
