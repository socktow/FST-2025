// Rune style ranges
const RUNE_STYLES = {
  PRECISION: {
    id: 7201,
    name: 'Precision',
    image: '7201_precision.png',
    range: [8000, 8099, 9000, 9999] // Precision runes range
  },
  DOMINATION: {
    id: 7200,
    name: 'Domination',
    image: '7200_domination.png',
    range: [8100, 8199] // Domination runes range
  },
  SORCERY: {
    id: 7202,
    name: 'Sorcery',
    image: '7202_sorcery.png',
    range: [8200, 8299] // Sorcery runes range
  },
  WHIMSY: {
    id: 7203,
    name: 'Inspiration',
    image: '7203_whimsy.png',
    range: [8300, 8399] // Inspiration runes range
  },
  RESOLVE: {
    id: 7204,
    name: 'Resolve',
    image: '7204_resolve.png',
    range: [8400, 8499] // Resolve runes range
  }
};

// Get rune style based on rune ID
function getRuneStyleFromId(runeId) {
  const id = parseInt(runeId);
  
  for (const style of Object.values(RUNE_STYLES)) {
    for (let i = 0; i < style.range.length; i += 2) {
      if (id >= style.range[i] && id <= style.range[i + 1]) {
        return style;
      }
    }
  }
  return null;
}

// Get secondary rune style from perks array
export function getSecondaryRuneStyle(perks) {
  if (!perks || perks.length < 6) return null;

  // Get style from 4th and 5th runes (secondary runes)
  const secondaryRune1 = getRuneStyleFromId(perks[4].id);
  const secondaryRune2 = getRuneStyleFromId(perks[5].id);

  // Both secondary runes should be from the same style
  if (secondaryRune1 && secondaryRune1 === secondaryRune2) {
    return secondaryRune1;
  }

  return null;
}

// Get primary rune style from perks array
export function getPrimaryRuneStyle(perks) {
  if (!perks || perks.length === 0) return null;

  // Get style from first rune (keystone)
  return getRuneStyleFromId(perks[0].id);
}

// Get both primary and secondary rune styles
export function getRuneStyles(perks) {
  return {
    primary: getPrimaryRuneStyle(perks),
    secondary: getSecondaryRuneStyle(perks)
  };
} 