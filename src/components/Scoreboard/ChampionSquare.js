import Image from "next/image";

export default function ChampionSquare({ player, size = "50px" }) {
  return (
    <div className="relative w-11.5 h-11.5 border-1 border-solid border-gray-800">
      <Image
        src={`http://localhost:58869/${player.championInfo.square}`}
        alt={`${player.championInfo.name} champion icon for ${player.playerName}`}
        fill
        className="object-contain"
        sizes={size}
      />
    </div>
  );
} 