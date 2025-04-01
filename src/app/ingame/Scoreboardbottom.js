import { calculateGoldDiff } from "../../service/goldService";
import { splitTeams } from "../../service/scoreboardService";
import ChampionSquare from "../../components/Scoreboard/ChampionSquare";
import ResourceBars from "../../components/Scoreboard/ResourceBars";
import GoldDiff from "../../components/Scoreboard/GoldDiff";
import AbilityIcon from "../../components/Scoreboard/AbilityIcon";
import PerkIcon from "../../components/Scoreboard/PerkIcon";
import PlayerName from "../../components/Scoreboard/PlayerName";
import PlayerKDA from "@/components/Scoreboard/PlayerKDA";

// PlayerAbilities component
const PlayerAbilities = ({ abilities, isDead, isBlueTeam }) => {
  // Order abilities based on team
  const abilityOrder = isBlueTeam
    ? [abilities?.spell1, abilities?.spell2, abilities?.ultimate]
    : [abilities?.ultimate, abilities?.spell1, abilities?.spell2];

  return (
    <div className="flex flex-row gap-1 relative">
      {abilityOrder.map((ability, idx) => (
        <AbilityIcon key={idx} ability={ability} isDead={isDead} />
      ))}
    </div>
  );
};

// PlayerInfo component
const PlayerInfo = ({ player, playerData, isBlueTeam }) => {
  const isDead = playerData?.respawnTimeRemaining > 0;

  return (
    <div
      className="flex flex-col gap-1 relative"
      style={{
        alignItems: isBlueTeam ? "flex-end" : "flex-start",
      }}
    >
      <div className="flex items-center gap-2">
        {isBlueTeam ? (
          <>
            <PlayerKDA
              kills={playerData?.kills || 0}
              deaths={playerData?.deaths || 0}
              assists={playerData?.assists || 0}
            />
            <PlayerName name={player.playerName} isDead={isDead} />
          </>
        ) : (
          <>
            <PlayerName name={player.playerName} isDead={isDead} />
            <PlayerKDA
              kills={playerData?.kills || 0}
              deaths={playerData?.deaths || 0}
              assists={playerData?.assists || 0}
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isBlueTeam ? (
          <>
            <PlayerAbilities
              abilities={player.abilities}
              isDead={isDead}
              isBlueTeam={isBlueTeam}
            />
            <ResourceBars
              player={player}
              isDead={isDead}
              isReversed={isBlueTeam}
            />
            <PerkIcon
              perk={player.perks[0]}
              level={player.level}
              isDead={isDead}
            />
          </>
        ) : (
          <>
            <PerkIcon
              perk={player.perks[0]}
              level={player.level}
              isDead={isDead}
            />
            <ResourceBars
              player={player}
              isDead={isDead}
              isReversed={isBlueTeam}
            />
            <PlayerAbilities
              abilities={player.abilities}
              isDead={isDead}
              isBlueTeam={isBlueTeam}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default function Scoreboardbottom({ playersdata = [], players = [] }) {
  const { blueTeam, redTeam, blueTeamData, redTeamData } = splitTeams(
    players,
    playersdata
  );
  const goldDiffs = calculateGoldDiff(
    blueTeamData,
    redTeamData,
    playersdata
  ).playerDiffs;

  const renderPlayer = (player, playerData, isBlueTeam) => {
    const isDead = playerData?.respawnTimeRemaining > 0;
    const playerStyle = { filter: isDead ? "grayscale(100%)" : "none" };

    return (
      <div
        key={player.champion}
        className={`flex items-center ${
          isBlueTeam ? "justify-end gap-2" : "gap-2"
        }`}
        style={playerStyle}
      >
        {isBlueTeam && (
          <PlayerInfo
            player={player}
            playerData={playerData}
            isBlueTeam={isBlueTeam}
          />
        )}
        <ChampionSquare
          player={player}
          size={isBlueTeam ? "50px" : "40px"}
          respawnTime={playerData?.respawnTimeRemaining}
          isDead={isDead}
        />
        {!isBlueTeam && (
          <PlayerInfo
            player={player}
            playerData={playerData}
            isBlueTeam={isBlueTeam}
          />
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto" style={{ width: "1260px", height: "260px" }}>
      <div className="w-full h-full bg-black backdrop-blur-sm rounded-t-lg border border-gray-800">
        <div className="w-full h-full flex justify-between">
          <div className="w-full h-full bg-black-500/20">
            <div className="h-full flex flex-col justify-between py-1">
              {blueTeam.map((player) =>
                renderPlayer(
                  player,
                  playersdata.find((p) => p.champion === player.champion),
                  true
                )
              )}
            </div>
          </div>
          <div className="w-[70px] h-full bg-block-500/20">
            <div className="h-full flex flex-col justify-between py-2">
              {goldDiffs.map((diff, index) => (
                <GoldDiff key={index} diff={diff.diff} />
              ))}
            </div>
          </div>
          <div className="w-full h-full bg-black-500/20">
            <div className="h-full flex flex-col justify-between py-1">
              {redTeam.map((player) =>
                renderPlayer(
                  player,
                  playersdata.find((p) => p.champion === player.champion),
                  false
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
