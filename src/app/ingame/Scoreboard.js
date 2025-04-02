import Image from 'next/image';
import Teamname from "../../components/Teamscoreboard/Teamname";
import Tower from "../../components/Teamscoreboard/Tower";
import Killpoint from "../../components/Teamscoreboard/Killpoint";
import Gold from "../../components/Teamscoreboard/Gold";
import towerIcon from '../../image/team/tower-100.png';
import killsIcon from '../../image/team/kills.png';
import goldIcon from '../../image/team/icon_gold.png';

export default function Scoreboard({ gameTime = "00:00" }) {
  return (
    <div className="w-full h-full justify-center items-center">
      <div className="w-[350px] h-[120px] bg-black rounded-lg">
        {/* Grid container */}
        <div className="w-full h-full grid grid-cols-4 grid-rows-3 py-1">
          {/* Row 1 - Headers */}
          <div className="h-11 bg-black flex items-center justify-center text-white text-2xl font-bold">
            {gameTime}
          </div>
          <div className="h-11 flex items-center justify-center">
            <Image
              src={towerIcon}
              alt="Tower"
              width={30}
              height={30}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="h-11 flex items-center justify-center">
            <Image
              src={killsIcon}
              alt="Kills"
              width={20}
              height={20}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="h-11 flex items-center justify-center mt-1.5">
            <Image
              src={goldIcon}
              alt="Gold"
              width={20}
              height={20}
              style={{
                objectFit: "cover",
                clipPath: "inset(0 0 50% 0)"
              }}
            />
          </div>

          {/* Row 2 - Blue Team */}
          <Teamname name="BLUE" isBlueTeam={true} />
          <Tower count={1} isBlueTeam={true} />
          <Killpoint count={2} isBlueTeam={true} />
          <Gold value="15.8K" isBlueTeam={true} />

          {/* Row 3 - Yellow Team */}
          <Teamname name="RED" isBlueTeam={false} />
          <Tower count={2} isBlueTeam={false} />
          <Killpoint count={5} isBlueTeam={false} />
          <Gold value="22.1K" isBlueTeam={false} />
        </div>
      </div>
    </div>
  );
}
