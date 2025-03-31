export default function PlayerName({ name, isDead }) {
  return (
    <div className="text-white text-sm font-semibold" style={{ filter: isDead ? "grayscale(100%)" : "none" }}>
      {name}
    </div>
  );
} 