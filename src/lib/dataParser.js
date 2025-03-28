import { convertTime, convertToInt } from "@/service/convertnumber";

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
          health: `${convertToInt(p.health?.current)}/${convertToInt(
            p.health?.max
          )}`,
          mana: `${convertToInt(p.resource?.current)}/${convertToInt(
            p.resource?.max
          )}`,
        }))
      ) || [];

    const playersdata = (data.state?.scoreboardBottom?.teams || [])
      .map((team) =>
        (team.players || []).map((player) => ({
          name: player.name || "Unknown",
          champion: player.champion?.name || "Unknown",
          totalGold: Math.round(player.totalGold) || 0,
          deaths: player.deaths || 0,
          kills: player.kills || 0,
          assists: player.assists || 0,
          creepScore: player.creepScore || 0,
          visionScore: Math.round(player.visionScore) || 0,
          level: player.level || 0,
          gold: Math.round(player.gold) || 0,
          shutdown: Math.round(player.shutdown) || 0,
          respawnTimeRemaining: player.respawnTimeRemaining
            ? convertToInt(player.respawnTimeRemaining)
            : "Alive",
          items: (player.items || []).map(item => ({
            asset: item.asset || "",
            cooldown: item.cooldown || 0,
            displayName: item.displayName || "",
            count: item.count || 0,
            stacks: item.stacks || 0,
            id: item.id || 0,
            visionScore: item.visionScore || 0
          }))
        }))
      )
      .flat();

    return {
      gameStatus,
      gameTime,
      baronTimer,
      dragonTimer,
      atakhanTimer,
      scoreboard,
      players,
      playersdata,
    };
  }
  return null;
}
