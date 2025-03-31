export default function PlayerKDA({ kills, deaths, assists, creepScore, className }) {
  return (
    <div className={`${className} text-xs font-bold`}>
      <span className="text-white">{kills}/{deaths}/{assists}</span>
      {creepScore !== undefined && (
        <>
          <span className="text-gray-400"> | </span>
          <span className="text-white">{creepScore} CS</span>
        </>
      )}
    </div>
  );
}