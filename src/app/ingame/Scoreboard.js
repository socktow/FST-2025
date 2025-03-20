import Image from 'next/image';

export default function Scoreboard({ scoreboard, gameTime, teamData }) {
  return (
    <div className="flex">
      {/* Team Names Table */}
      <div className="bg-black/80 rounded-l-lg overflow-hidden">
        <div className="flex items-center h-7 p-1">
          {/* Timer */}
          <div className="flex items-center px-2">
            <span className="text-white">{gameTime}</span>
          </div>
        </div>

        {scoreboard.map((team, index) => (
          <div 
            key={index} 
            className={`flex items-center p-2 ${
              index === 0 ? 'bg-blue-900/50' : 'bg-red-900/50'
            }`}
          >
            <div className="flex items-center w-32 gap-2">
              {/* Team Logo */}
              {teamData && (
                <div className="w-6 h-6 relative">
                  {(index === 0 ? teamData.team2.logo : teamData.team1.logo) && (
                    <Image
                      src={index === 0 ? teamData.team2.logo : teamData.team1.logo}
                      alt="Team logo"
                      fill
                      className="object-contain"
                      sizes="24px"
                    />
                  )}
                </div>
              )}
              {/* Team Name */}
              <span className={`font-bold ${index === 0 ? 'text-blue-400' : 'text-red-400'}`}>
                {teamData ? 
                  (index === 0 ? teamData.team2.name : teamData.team1.name) :
                  (index === 0 ? 'TRI2' : 'TRI1')
                }
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Table */}
      <div className="bg-black/80 rounded-r-lg overflow-hidden">
        {/* Icons Header */}
        <div className="grid grid-cols-3 h-7 p-1">
          <div className="flex items-center justify-center">
            <span className="text-gray-300">☠</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-300">⚔</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-300">💰</span>
          </div>
        </div>

        {/* Stats Rows */}
        {scoreboard.map((team, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-3 gap-2 p-2 ${
              index === 0 ? 'bg-blue-900/50' : 'bg-red-900/50'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-8 h-6 border border-white/30 rounded">
                <span className="text-white font-medium">{team.kills}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-8 h-6 border border-white/30 rounded">
                <span className="text-white font-medium">{team.towers}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-6 border border-white/30 rounded">
                <span className="text-white font-medium">
                  {(team.gold / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
