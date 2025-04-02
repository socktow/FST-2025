import Image from 'next/image';
import { sortPlayerItems, getItemStacks } from '../../service/itemService';

export default function PlayerItems({ playerData, isBlueTeam, position = "left" }) {
  try {
    // Validate playerData and items
    if (!playerData || !Array.isArray(playerData.items)) {
      console.warn('Invalid player data or items array:', playerData);
      return null;
    }

    if (playerData.items.length === 0) return null;
    
    const sortedItems = sortPlayerItems(playerData.items, isBlueTeam);
    const positionStyle = position === "left" 
      ? "absolute -left-[300px] top-1/5 transform -translate-y-1/2 -z-10" 
      : "absolute -right-[300px] top-1/5 transform -translate-y-1/2 -z-10";

    return (
      <div className={`${positionStyle} flex ${position === "left" ? "flex-row-reverse" : "flex-row"} gap-1`}>
        {sortedItems.map((item, itemIndex) => {
          try {
            // Validate item data
            if (!item || !item.asset) {
              console.warn('Invalid item data:', item);
              return null;
            }

            const isLastItem = itemIndex === sortedItems.length - 1;
            const stacks = getItemStacks(item.stacks, isLastItem);
            
            return (
              <div 
                key={`${item.id || itemIndex}-${itemIndex}`}
                className="relative w-7.5 h-7.5 border border-gray-600 rounded-sm overflow-hidden"
              >
                <Image
                  src={`http://localhost:58869/${item.asset}`}
                  alt={item.displayName || "Item"}
                  fill
                  className="object-contain"
                  sizes="48px"
                  onError={(e) => {
                    console.warn('Failed to load item image:', item.asset);
                    e.target.style.display = 'none';
                  }}
                />
                {stacks !== null && (
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-[8px] px-[2px]">
                    {stacks}
                  </div>
                )}
              </div>
            );
          } catch (itemError) {
            console.error('Error rendering item:', itemError);
            return null;
          }
        })}
      </div>
    );
  } catch (error) {
    console.error('Error in PlayerItems component:', error);
    return null;
  }
} 