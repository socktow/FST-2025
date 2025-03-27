export default function Scoreboardbottom() {
  return (
    <div className="mx-auto" style={{ width: "1260px", height: "260px" }}>
      <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-t-lg border border-gray-800">
        <div className="w-full h-full flex justify-between">
          {/* Team 1 - Left Side */}
          <div className="w-full h-full bg-green-500/20 border-r border-green-500/30" />

          {/* Center Stats Display */}
          <div className="w-[150px] h-full bg-pink-500/20 border-l border-r border-pink-500/30">
            {/* Content will go here */}
          </div>

          {/* Team 2 - Right Side */}
          <div className="w-full h-full bg-green-500/20 border-l border-green-500/30" />
        </div>
      </div>
    </div>
  );
}
