import { convertTime, convertToInt } from "@/service/convertnumber";
import { getRuneStyles } from "@/service/runeService";

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
        baronPowerPlay: team.baronPowerPlay || {},
        dragonPowerPlay: team.dragonPowerPlay || {},
      })) || [];

    // 📌 Lấy danh sách tên và squareImg của 10 người chơi
    const players =
      data.state?.tabs?.flatMap((tab) =>
        tab.players.map((p) => {
          const perks = p.perks
            ? p.perks.map((perk) => ({
                id: perk.id,
                iconPath: perk.iconPath,
              }))
            : [];

          const runeStyles = getRuneStyles(perks);

          // Extract abilities information
          const abilities = p.abilities ? {
            ultimate: p.abilities.find(a => a.slot === "R") || null,
            spell1: p.abilities.find(a => a.slot === "D") || null,
            spell2: p.abilities.find(a => a.slot === "F") || null
          } : null;

          return {
            playerName: p.playerName,
            level: p.level || 1,
            hasBaron: p.hasBaron || false,
            hasDragon: p.hasDragon || false,
            experience: {
              previousLevel: p.experience?.previousLevel || 0,
              current: p.experience?.current || 0,
              nextLevel: p.experience?.nextLevel || 0
            },
            champion: p.championAssets?.name || "Unknown",
            championInfo: {
              alias: p.championAssets?.alias || "Unknown",
              splash: p.championAssets?.splashImg || "",
              square: p.championAssets?.squareImg || "",
            },
            health: `${convertToInt(p.health?.current)}/${convertToInt(
              p.health?.max
            )}`,
            mana: `${convertToInt(p.resource?.current)}/${convertToInt(
              p.resource?.max
            )}`,
            perks,
            runeStyles,
            abilities: abilities ? {
              ultimate: abilities.ultimate ? {
                iconPath: abilities.ultimate.assets.iconAsset,
                cooldown: abilities.ultimate.cooldown,
                totalCooldown: abilities.ultimate.totalCooldown,
                level: abilities.ultimate.level
              } : null,
              spell1: abilities.spell1 ? {
                iconPath: abilities.spell1.assets.iconAsset,
                cooldown: abilities.spell1.cooldown,
                totalCooldown: abilities.spell1.totalCooldown,
                level: abilities.spell1.level
              } : null,
              spell2: abilities.spell2 ? {
                iconPath: abilities.spell2.assets.iconAsset,
                cooldown: abilities.spell2.cooldown,
                totalCooldown: abilities.spell2.totalCooldown,
                level: abilities.spell2.level
              } : null
            } : null
          };
        })
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
          items: (player.items || []).map((item) => ({
            asset: item.asset || "",
            combineCost: item.combineCost || 0,
            cooldown: item.cooldown || 0,
            cost: item.cost || 0,
            count: item.count || 0,
            displayName: item.displayName || "",
            id: item.id || 0,
            maxCooldown: item.maxCooldown || 0,
            modifier: item.modifier || 0,
            stacks: item.stacks || 0,
            visionScore: item.visionScore || 0,
          })),
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
