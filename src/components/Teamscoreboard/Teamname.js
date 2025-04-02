export default function Teamname({ name, isBlueTeam = false }) {
  return (
    <div
      className={`relative right-1 flex items-center justify-center ${
        isBlueTeam
          ? "text-white bg-[#1a2942] border-l-6 border-[#3c5069]"
          : "text-white bg-[#421a1a] border-l-6 border-[#693c3c]"
      } font-bold m-1 h-8`}
    >
      {name}
    </div>
  );
}
