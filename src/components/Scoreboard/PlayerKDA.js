export default function PlayerKDA({ kills, deaths, assists, creepScore }) {

  return (
    <div 
      className={`flex flex-col justify-between items-center text-xs font-bold min-w-[50px] min-h-[10px] text-center`} 
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