// Champions that don't use mana
export const NO_RESOURCE_CHAMPIONS = [
  "Garen",
  "Katarina",
  "Riven",
  "Gnar",
  "Viego",
  "Yone",
  "Yasuo",
  "Kled",
];

// Champions that use Fury/Rage (red resource)
export const FURY_CHAMPIONS = [
  "Rumble",
  "Renekton",
  "Tryndamere",
  "Shyvana",
  "RekSai",
];

// Champions that use Energy (yellow resource)
export const ENERGY_CHAMPIONS = ["Akali", "Zed", "Shen", "Kennen", "Lee Sin"];

export const getResourceType = (championName) => {
  if (NO_RESOURCE_CHAMPIONS.includes(championName)) {
    return "none";
  }
  if (FURY_CHAMPIONS.includes(championName)) {
    return "fury";
  }
  if (ENERGY_CHAMPIONS.includes(championName)) {
    return "energy";
  }
  return "mana";
};

export const getResourceColor = (resourceType) => {
  switch (resourceType) {
    case "fury":
      return "bg-red-500";
    case "energy":
      return "bg-yellow-400";
    case "mana":
      return "bg-blue-500";
    default:
      return "";
  }
};
