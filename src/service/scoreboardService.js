import { getResourceType } from "./resourceService";

export const splitTeams = (players, playersdata) => {
  const blueTeam = players.slice(0, 5);
  const redTeam = players.slice(5, 10);
  const blueTeamData = playersdata.slice(0, 5);
  const redTeamData = playersdata.slice(5, 10);

  return {
    blueTeam,
    redTeam,
    blueTeamData,
    redTeamData
  };
};

export const calculatePercentage = (current, max) => {
  const [currentValue, maxValue] = [current, max].map(val => parseInt(val, 10));
  return (currentValue / maxValue * 100) || 0;
};

export const calculateXPPercentage = (current, previousLevel, nextLevel) => {
  if (!current || !previousLevel || !nextLevel) return 0;
  const progress = (current - previousLevel) / (nextLevel - previousLevel);
  return Math.min(Math.max(progress * 100, 0), 100);
};

export const getResourceGradient = (resourceType) => {
  switch (resourceType) {
    case 'mana':
      return 'bg-gradient-to-r from-blue-800 to-blue-500';
    case 'energy':
      return 'bg-gradient-to-r from-yellow-600 to-yellow-400';
    case 'fury':
      return 'bg-gradient-to-r from-red-800 to-red-500';
    default:
      return '';
  }
};

export const processPlayerStats = (player) => {
  const [currentHealth, maxHealth] = player.health.split('/');
  const [currentMana, maxMana] = player.mana.split('/');
  const healthPercentage = calculatePercentage(currentHealth, maxHealth);
  const manaPercentage = calculatePercentage(currentMana, maxMana);
  const resourceType = getResourceType(player.champion);
  const xpPercentage = calculateXPPercentage(
    player.experience.current,
    player.experience.previousLevel,
    player.experience.nextLevel
  );

  return {
    healthPercentage,
    manaPercentage,
    resourceType,
    resourceGradient: getResourceGradient(resourceType),
    xpPercentage
  };
}; 