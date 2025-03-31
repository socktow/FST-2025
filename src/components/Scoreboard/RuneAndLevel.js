import Image from "next/image";

// Import rune style images
import domination from "../../image/runestyle/7200_domination.png";
import precision from "../../image/runestyle/7201_precision.png";
import sorcery from "../../image/runestyle/7202_sorcery.png";
import whimsy from "../../image/runestyle/7203_whimsy.png";
import resolve from "../../image/runestyle/7204_resolve.png";

const runeStyleImages = {
  'Domination': domination,
  'Precision': precision,
  'Sorcery': sorcery,
  'Inspiration': whimsy,
  'Resolve': resolve
};

export default function RuneAndLevel({ player, isBlueTeam = false }) {
    return (
      <div className={`flex items-center ${isBlueTeam ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-6 h-6 bg-gray-800/50 text-white font-semibold flex items-center justify-center">
          {player.level}
        </div>
        <div className="w-6 h-6 rounded relative mx-1">
          <Image
            src={`http://localhost:58869/${player.perks[0]?.iconPath}`}
            alt={`Rune page for ${player.playerName}`}
            fill
            className="object-contain"
            sizes="24px"
          />
          {player.runeStyles?.secondary && (
            <div className={`absolute bottom-0 ${isBlueTeam ? 'left-0' : 'right-0'} w-3 h-3`}>
              <Image
                src={runeStyleImages[player.runeStyles.secondary.name]}
                alt={`Secondary rune style: ${player.runeStyles.secondary.name}`}
                fill
                className="object-contain"
                sizes="12px"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  