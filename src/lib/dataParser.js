export function parseGameData(data) {
  if (data.type === "ingame-state-update") {
    // 📌 Lấy trạng thái của game
    const gameStatus = data.state?.gameStatus || "Unknown";

    // 📌 Lấy thời gian của game
    const gameTime = data.state?.gameTime || 0;

    // 📌 Lấy thông tin thời gian hồi Baron
    const baronTimer = {
      subType: data.state?.baronPitTimer?.subType || "Unknown",
      timeLeft: data.state?.baronPitTimer?.timeLeft || 0,
    };

    const dragonTimer = {
      subType: data.state?.dragonPitTimer?.subType || "Unknown",
      timeLeft: data.state?.dragonPitTimer?.timeLeft || 0,
    };

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
          mana: `${p.resource?.current || 0}/${p.resource?.max || 0}`
        }))
      ) || [];

    return { gameStatus, gameTime, baronTimer, dragonTimer, scoreboard, players };
  }
  return null;
}
