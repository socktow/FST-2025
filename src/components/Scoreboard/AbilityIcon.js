import Image from "next/image";

export default function AbilityIcon({ ability, isDead, size = "24px" }) {
  if (!ability) return null;

  return (
    <div className={`w-6 h-6 bg-gray-800/50 rounded relative border-1 border-r-zinc-800`}>
      <Image
        src={`http://localhost:58869/${ability.iconPath}`}
        alt={ability.name || "Ability"}
        layout="fill"
        objectFit="contain"
        style={{
          filter: isDead ? "grayscale(100%)" : "none",
        }}
      />
      {ability.cooldown > 0 && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">
          {Math.ceil(ability.cooldown)}
        </div>
      )}
    </div>
  );
} 