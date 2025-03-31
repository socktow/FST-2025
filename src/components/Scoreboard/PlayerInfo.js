import PlayerName from "./PlayerName";
import ResourceBars from "./ResourceBars";
import RuneAndLevel from "./RuneAndLevel";

export default function PlayerInfo({ player, isBlueTeam = false, isReversed = false }) {
  const isDead = player.respawnTimeRemaining > 0;

  return (
    <div className={`flex flex-col gap-1 ${isBlueTeam ? 'items-end' : ''} ${isDead ? 'grayscale' : ''}`}>
      <PlayerName playerName={player.playerName} isBlueTeam={isBlueTeam} />
      <div className="flex items-center gap-2">
        {isBlueTeam ? (
          <>
            <ResourceBars player={player} isReversed={isReversed} />
            <RuneAndLevel player={player} isBlueTeam={isBlueTeam} />
          </>
        ) : (
          <>
            <RuneAndLevel player={player} isBlueTeam={isBlueTeam} />
            <ResourceBars player={player} isReversed={isReversed} />
          </>
        )}
      </div>
    </div>
  );
} 