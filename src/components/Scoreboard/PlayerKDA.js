export default function PlayerKDA({ kills, deaths, assists, creepScore, position = "left" }) {
  const positionStyle = position === "left" 
    ? "absolute w-10 h-10 rounded-md -left-[55px] top-1/5 transform -translate-y-1/2 -z-10" 
    : "absolute w-10 h-10 rounded-md -right-[55px] top-1/5 transform -translate-y-1/2 -z-10";

  return (
    <div 
      className={`${positionStyle} flex flex-col justify-between items-center text-sm font-semibold min-w-[50px] min-h-[10px] text-center`} 
    >
      <div className="whitespace-nowrap">
        <span className="text-white">{kills}/{deaths}/{assists}</span>
      </div>
      {creepScore !== undefined && (
        <div>
          <span className="text-white">{creepScore}</span>
        </div>
      )}
    </div>
  );
}