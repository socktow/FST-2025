export default function Timer({ baronTimer, dragonTimer }) {
  // Hàm kiểm tra và hiển thị thời gian hoặc LIVE
  const displayTime = (timer) => {
    if (!timer) return null;
    const [minutes, seconds] = timer.timeLeft.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    
    if (totalSeconds <= 0) {
      return (
        <span className="text-lg font-bold text-red-500 animate-pulse">
          LIVE
        </span>
      );
    }
    return (
      <span className="text-2xl font-bold text-white">
        {timer.timeLeft}
      </span>
    );
  };

  return (
    <div className="absolute top-4 right-4 flex gap-6">
      {/* Baron Timer */}
      {baronTimer && (
        <div className="relative group">
          <div className="flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/50 shadow-lg hover:bg-purple-800/80 transition-all">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-purple-300 font-medium">Baron</span>
            </div>
            {displayTime(baronTimer)}
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-500/50 rounded-full">
            <div className="h-full bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Dragon Timer */}
      {dragonTimer && (
        <div className="relative group">
          <div className="flex items-center gap-2 bg-green-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-500/50 shadow-lg hover:bg-green-700/80 transition-all">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs text-green-300 font-medium">Dragon</span>
            </div>
            {displayTime(dragonTimer)}
          </div>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-green-500/50 rounded-full">
            <div className="h-full bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}
