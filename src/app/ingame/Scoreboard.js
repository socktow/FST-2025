import Image from "next/image";
import Teamname from "../../components/Teamscoreboard/Teamname";
import Tower from "../../components/Teamscoreboard/Tower";
import Killpoint from "../../components/Teamscoreboard/Killpoint";
import Gold from "../../components/Teamscoreboard/Gold";
import towerIcon from "../../image/team/tower-100.png";
import killsIcon from "../../image/team/kills.png";
import goldIcon from "../../image/team/icon_gold.png";

export default function Scoreboard({ gameTime = "00:00", scoreboard = [] }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[260px] h-[110px] bg-black rounded-lg">
        {/* Grid container with custom column widths */}
        <div
          className="w-full h-full grid grid-rows-3 py-1"
          style={{
            gridTemplateColumns: "120px 40px 40px 60px",
          }}
        >
          {/* Row 1 - Headers */}
          <div className="h-11 bg-black flex items-center justify-center text-white text-sm font-bold">
            {gameTime}
          </div>
          <div className="h-11 flex items-center justify-center">
            <Image
              src={towerIcon}
              alt="Tower"
              width={15}
              height={15}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="h-11 flex items-center justify-center">
            <Image
              src={killsIcon}
              alt="Kills"
              width={15}
              height={15}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="h-8 flex items-center justify-center mt-3">
            <Image
              src={goldIcon}
              alt="Gold"
              width={15}
              height={15}
              className="filter brightness-0 invert"
              style={{
                objectFit: "cover",
                clipPath: "inset(0 0 50% 0)",
              }}
            />
          </div>

          {/* Row 2 - Blue Team */}
          <Teamname isBlueTeam={true} />
          <Tower count={scoreboard[0]?.towers || 0} isBlueTeam={true} />
          <Killpoint count={scoreboard[0]?.kills || 0} isBlueTeam={true} />
          <Gold
            value={`${(scoreboard[0]?.gold / 1000).toFixed(1)}K`}
            isBlueTeam={true}
          />

          {/* Row 3 - Red Team */}
          <Teamname isBlueTeam={false} />
          <Tower count={scoreboard[1]?.towers || 0} isBlueTeam={false} />
          <Killpoint count={scoreboard[1]?.kills || 0} isBlueTeam={false} />
          <Gold
            value={`${(scoreboard[1]?.gold / 1000).toFixed(1)}K`}
            isBlueTeam={false}
          />
        </div>
      </div>
    </div>
  );
}
