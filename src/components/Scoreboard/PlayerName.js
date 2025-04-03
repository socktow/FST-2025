import { useEffect, useRef } from "react";

const playerLogs = new Set(); 

export default function PlayerName({ name, isDead }) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    playerLogs.add(name);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setTimeout(() => {
        console.log({ player: Array.from(playerLogs) }); 
      }, 0);
    }
  }, [name]);

  return (
    <div className="text-white text-sm font-semibold" style={{ filter: isDead ? "grayscale(100%)" : "none" }}>
      {name}
    </div>
  );
}
