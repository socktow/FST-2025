import { useEffect, useRef, useState } from "react";
import { playerConfigApi } from "@/app/api/api";

const playerLogs = new Set();

export default function PlayerName({ name, isDead, index, isBlueTeam , shutdown }) {
  const isFirstRender = useRef(true);
  const [customName, setCustomName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const playerConfigCache = useRef(new Map());

  useEffect(() => {
    playerLogs.add(name);
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [name]);
  
  const fetchCustomNames = async () => {
    try {
      setIsLoading(true);
      const config = await playerConfigApi.getAll();
      const playerIndex = isBlueTeam ? index : index + 5;

      // Check cache first
      if (playerConfigCache.current.has(playerIndex)) {
        setCustomName(playerConfigCache.current.get(playerIndex));
        setIsLoading(false);
        return;
      }
      const playerConfig = config.find(
        (config) => config.id === playerIndex && config.CustomName && config.CustomName !== ""
      );
      if (playerConfig) {
        const customName = playerConfig.CustomName;
        playerConfigCache.current.set(playerIndex, customName);
        setCustomName(customName);
      } else {
        setCustomName("");
      }
    } catch (error) {
      console.error("Failed to fetch custom names:", error);
      setCustomName("");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomNames();
  }, [index, isBlueTeam]);

  const displayName = isLoading ? name : customName || name;

  return (
    <div className="text-white text-sm font-semibold" style={{ filter: isDead ? "grayscale(100%)" : "none" }}>
      {displayName}
    </div>
  );
}
