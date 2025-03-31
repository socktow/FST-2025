export default function PlayerName({ playerName, isBlueTeam = false }) {
  return (
    <div className={`text-white text-sm ${isBlueTeam ? 'text-right' : 'text-left'}`}>
      {playerName}
    </div>
  );
} 