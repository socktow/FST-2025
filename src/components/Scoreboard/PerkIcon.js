import Image from "next/image";

export default function PerkIcon({ perk, level, isDead, isBlueTeam }) {
  return (
    <>
      <div className="w-6 h-6">
        <div className="w-6 h-6 rounded relative">
          {perk?.iconPath && (
            <Image
              src={`http://localhost:58869/${perk.iconPath}`}
              alt="Rune page"
              layout="fill"
              objectFit="contain"
              style={{
                filter: isDead ? "grayscale(100%)" : "none",
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`w-6 h-6 text-white font-semibold flex items-center justify-center ${
          isBlueTeam ? "bg-[#1a2942]" : "bg-[#421a1a]"
        }`}
      >
        {level}
      </div>
    </>
  );
}
