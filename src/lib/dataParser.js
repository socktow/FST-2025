import { convertTime } from "@/service/convertnumber";

export function parseGameData(data) {
  if (data.type === "ingame-state-update") {
    // 📌 Lấy trạng thái của game
    const gameStatus = data.state?.gameStatus || "Unknown";

    // 📌 Lấy thời gian của game
    const gameTime = convertTime(data.state?.gameTime || 0);

    // 📌 Lấy thông tin thời gian hồi Baron và format thành mm:ss
    const baronTimer = data.state?.baronPitTimer
      ? {
          subType: data.state.baronPitTimer.subType || "Unknown",
          timeLeft: convertTime(data.state.baronPitTimer.timeLeft),
        }
      : null;

    // 📌 Lấy thông tin thời gian hồi Dragon và format thành mm:ss
    const dragonTimer = data.state?.dragonPitTimer
      ? {
          subType: data.state.dragonPitTimer.subType || "Unknown",
          timeLeft: convertTime(data.state.dragonPitTimer.timeLeft),
        }
      : null;

    const atakhanTimer = data.state?.atakhanTimer
      ? {
          subType: data.state.atakhanTimer.subType || "Unknown",
          timeLeft: convertTime(data.state.atakhanTimer.timeLeft),
        }
      : null;

    // 📌 Lấy thông tin scoreboard của 2 đội
    const scoreboard =
      data.state?.scoreboard?.teams.map((team) => ({
        gold: team.gold || 0,
        kills: team.kills || 0,
        towers: team.towers || 0,
        grubs: team.grubs || 0,
        dragons: Array.isArray(team.dragons) ? team.dragons : [],
        featsOfStrength: team.featsOfStrength || {},
      })) || [];

    // 📌 Lấy danh sách tên và squareImg của 10 người chơi
    const players =
      data.state?.tabs?.flatMap((tab) =>
        tab.players.map((p) => ({
          playerName: p.playerName,
          champion: p.championAssets?.name || "Unknown",
          health: `${p.health?.current || 0}/${p.health?.max || 0}`,
          mana: `${p.resource?.current || 0}/${p.resource?.max || 0}`,
        }))
      ) || [];

    return {
      gameStatus,
      gameTime,
      baronTimer,
      dragonTimer,
      atakhanTimer,
      scoreboard,
      players,
    };
  }
  return null;
}
