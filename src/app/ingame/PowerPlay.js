export default function PowerPlay(scoreboard) {
    console.log(scoreboard);
    return (
      <div className="w-full h-full flex justify-center items-center px-2">
        <div className="w-[260px] h-[110px] flex flex-col">
          {/* Baron Power Play */}
          <div className="h-1/2 p-2 bg-gradient-to-r from-purple-800 to-black rounded-full relative overflow-hidden">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-2">
              </div>
              <div className="flex-1 text-xs">
                <h2 className="text-white font-semibold">Baron Power Play</h2>
                <div className="text-gray-300 flex justify-between">
                  <span>Team: ABC</span>
                  <span>Gold: +1000</span>
                  <span>Time: 5:00</span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Dragon Power Play */}
          <div className="h-1/2 p-2 bg-gradient-to-r from-gray-600 to-gray-900 rounded-full relative overflow-hidden">
            <div className="flex items-center">
              {/* Logo (Placeholder) */}
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-2"></div>
  
              <div className="flex-1 text-xs">
                <h2 className="text-white font-semibold">Dragon Power Play</h2>
                <div className="text-gray-300 flex justify-between">
                  <span>Team: XYZ</span>
                  <span>Gold: +800</span>
                  <span>Time: 3:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }