import { calculateGoldDiff } from "../../service/goldService";
import { splitTeams } from "../../service/scoreboardService";
import ChampionSquare from "../../components/Scoreboard/ChampionSquare";
import ResourceBars from "../../components/Scoreboard/ResourceBars";
import GoldDiff from "../../components/Scoreboard/GoldDiff";
import AbilityIcon from "../../components/Scoreboard/AbilityIcon";
import PerkIcon from "../../components/Scoreboard/PerkIcon";
import PlayerName from "../../components/Scoreboard/PlayerName";
import PlayerKDA from "../../components/Scoreboard/PlayerKDA";
import PlayerItems from "../../components/Scoreboard/PlayerItems";

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
const PlayerInfo = ({ player, playerData, isBlueTeam, index }) => {
  const isDead = playerData?.respawnTimeRemaining > 0;

  return (
    <div
      className="flex flex-col gap-1"
      style={{
        alignItems: isBlueTeam ? "flex-end" : "flex-start",
      }}
    >
      <div className="flex items-center gap-2">
        <PlayerName 
          name={player.playerName}
          isDead={isDead} 
          index={index}
          isBlueTeam={isBlueTeam}
        />
      </div>
      <div className="flex items-center gap-2">
        {isBlueTeam ? (
          <>
            <div className="relative">
              <PlayerKDA
                kills={playerData?.kills}
                deaths={playerData?.deaths}
                assists={playerData?.assists}
                creepScore={playerData?.creepScore}
                position="left"
              />
              <PlayerItems
                playerData={playerData}
                isBlueTeam={isBlueTeam}
                position="left"
              />
              <PlayerAbilities
                abilities={player.abilities}
                isDead={isDead}
                isBlueTeam={isBlueTeam}
              />
            </div>
            <ResourceBars
              player={player}
              isDead={isDead}
              isReversed={isBlueTeam}
            />
            <PerkIcon
              perk={player.perks[0]}
              level={player.level}
              isDead={isDead}
              isBlueTeam={true}
            />
          </>
        ) : (
          <>
            <PerkIcon
              perk={player.perks[0]}
              level={player.level}
              isDead={isDead}
              isBlueTeam={false}
            />
            <ResourceBars
              player={player}
              isDead={isDead}
              isReversed={isBlueTeam}
            />
            <div className="relative">
              <PlayerAbilities
                abilities={player.abilities}
                isDead={isDead}
                isBlueTeam={isBlueTeam}
              />
              <PlayerItems
                playerData={playerData}
                isBlueTeam={isBlueTeam}
                position="right"
              />
              <PlayerKDA
                kills={playerData?.kills}
                deaths={playerData?.deaths}
                assists={playerData?.assists}
                creepScore={playerData?.creepScore}
                position="right"
              />
            </div>
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

  const renderPlayer = (player, playerData, isBlueTeam, index) => {
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
            index={index}
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
            index={index}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* <div className="w-[160px] mx-auto bg-black text-white text-center text-xl font-bold py-2 rounded-t-lg border border-gray-800">
        Road To VCS 2025
      </div> */}
  
      <div className="mx-auto" style={{ width: "1260px", height: "260px" }}>
        <div className="w-full h-full bg-black backdrop-blur-sm rounded-t-lg border border-gray-800">
          <div className="w-full h-full flex justify-between">
            <div className="w-full h-full bg-black-500/20">
              <div className="h-full flex flex-col justify-between py-1">
                {blueTeam.map((player, index) =>
                  renderPlayer(
                    player,
                    playersdata.find((p) => p.champion === player.champion),
                    true,
                    index
                  )
                )}
              </div>
            </div>
            <div className="w-[70px] h-full bg-black-500/20">
              <div className="h-full flex flex-col justify-between py-2">
                {goldDiffs.map((diff, index) => (
                  <GoldDiff key={index} diff={diff.diff} />
                ))}
              </div>
            </div>
            <div className="w-full h-full bg-black-500/20">
              <div className="h-full flex flex-col justify-between py-1">
                {redTeam.map((player, index) =>
                  renderPlayer(
                    player,
                    playersdata.find((p) => p.champion === player.champion),
                    false,
                    index
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
