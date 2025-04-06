export default function Gold({ value = "0", isBlueTeam = false }) {
    return (
      <div
        className={`flex items-center justify-center gap-1 text-white font-bold 
          ${isBlueTeam ? " border-b-4 border-[#3c5069]" : "border-b-4 border-[#693c3c]"}
          m-1 h-8`}
      >
        <span>{value}</span>
      </div>
    );
  }
  