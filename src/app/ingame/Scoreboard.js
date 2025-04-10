import React from "react";
import Image from "next/image";
import Teamname from "../../components/Teamscoreboard/Teamname";
import Tower from "../../components/Teamscoreboard/Tower";
import Killpoint from "../../components/Teamscoreboard/Killpoint";
import Gold from "../../components/Teamscoreboard/Gold";
import towerIcon from "../../image/team/tower-100.png";
import killsIcon from "../../image/team/kills.png";
import goldIcon from "../../image/team/icon_gold.png";

const icons = [towerIcon, killsIcon, goldIcon];

export default function Scoreboard({ gameTime = "00:00", scoreboard = [] }) {
  const teams = [
    { isBlueTeam: true, data: scoreboard[0] || {} },
    { isBlueTeam: false, data: scoreboard[1] || {} },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[260px] h-[110px] bg-black rounded-lg">
        <div
          className="w-full h-full grid grid-rows-3 py-1"
          style={{ gridTemplateColumns: "120px 40px 40px 60px" }}
        >
          {/* Row 1 - Header with time and icons */}
          <div className="h-11 bg-black flex items-center justify-center text-white text-sm font-bold">
            {gameTime}
          </div>
          {icons.map((icon, index) => (
            <div key={index} className="h-11 flex items-center justify-center">
              <Image
                src={icon}
                alt={`Icon ${index}`}
                width={15}
                height={15}
                className="filter brightness-0 invert"
                style={
                  index === 2
                    ? {
                        objectFit: "cover",
                        clipPath: "inset(0 0 50% 0)",
                        marginTop: "12px",
                      }
                    : {}
                }
              />
            </div>
          ))}

          {/* Row 2 & 3 - Teams */}
          {teams.map(({ isBlueTeam, data }, index) => (
            <React.Fragment key={index}>
              <Teamname isBlueTeam={isBlueTeam} />
              <Tower
                count={data.towers || 0}
                isBlueTeam={isBlueTeam}
                fullScoreboard={scoreboard}
              />
              <Killpoint
                count={data.kills || 0}
                isBlueTeam={isBlueTeam}
                fullScoreboard={scoreboard}
              />
              <Gold
                value={`${(data.gold / 1000 || 0).toFixed(1)}K`}
                isBlueTeam={isBlueTeam}
                fullScoreboard={scoreboard}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
