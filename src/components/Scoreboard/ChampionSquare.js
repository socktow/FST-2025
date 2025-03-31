import Image from "next/image";

export default function ChampionSquare({ player, size = "50px", respawnTime = 0 }) {
  return (
    <div className="relative w-11.5 h-11.5 border-1 border-solid border-gray-800">
      <Image
        src={`http://localhost:58869/${player.championInfo.square}`}
        alt={`${player.championInfo.name} champion icon for ${player.playerName}`}
        fill
        className="object-contain"
        sizes={size}
      />
      {respawnTime > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white text-xl font-semibold">
            {Math.ceil(respawnTime)}
          </span>
        </div>
      )}
    </div>
  );
} 