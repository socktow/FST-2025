export const getBackgroundColor = (timer) => {
  if (!timer || !timer.subType) return "bg-gradient-to-r from-gray-700 to-gray-800"; // Default to a dark gray gradient

  const subtype = timer.subType.toLowerCase();
  
  if (subtype.includes('dragon')) {
    if (subtype.includes('fire')) return 'bg-gradient-to-r from-orange-500 to-red-600'; // Fire gradient
    if (subtype.includes('air')) return 'bg-gradient-to-r from-gray-400 to-gray-600'; // Air gradient
    if (subtype.includes('chemtech')) return 'bg-gradient-to-r from-green-700 to-green-900'; // Chemtech gradient
    if (subtype.includes('earth')) return 'bg-gradient-to-r from-yellow-800 to-yellow-900'; // Earth gradient
    if (subtype.includes('hextech')) return 'bg-gradient-to-r from-cyan-600 to-blue-700'; // Hextech gradient
    if (subtype.includes('water')) return 'bg-gradient-to-b from-[#46746c] to-[#a1dacf]'; // Water gradient (as it was)
    if (subtype.includes('elder')) return 'bg-gradient-to-r from-pink-600 to-pink-800'; // Elder gradient
    return 'bg-gradient-to-r from-gray-700 to-gray-800'; // Default dragon gradient
  }

  return 'bg-gradient-to-r from-gray-700 to-gray-800'; // Default gradient
};

export const getLightColor = (bgColor) => {
  switch (bgColor) {
    // case 'bg-gradient-to-r from-orange-500 to-red-600': return '#FFFFFF';
    // case 'bg-gradient-to-r from-gray-400 to-gray-600': return '#FFFFFF';
    // case 'bg-gradient-to-r from-green-700 to-green-900': return '#FFFFFF';
    // case 'bg-gradient-to-r from-yellow-800 to-yellow-900': return '#FFFFFF';
    // case 'bg-gradient-to-r from-cyan-600 to-blue-700': return '#FFFFFF';
    // case 'bg-gradient-to-b from-[#46746c] to-[#a1dacf]': return '#FFFFFF';
    // case 'bg-gradient-to-r from-pink-600 to-pink-800': return '#FFFFFF';
    // case 'bg-gradient-to-r from-purple-600 to-purple-800': return '#FFFFFF';
    // case 'bg-gradient-to-r from-gray-700 to-gray-800': return '#FFFFFF';
    default: return '#FFFFFF';
  }
};

export const calculateProgress = (timer) => {
  if (!timer) return 0;
  
  const [minutes, seconds] = timer.timeLeft?.split(':').map(Number) || [0, 0];
  const totalSeconds = minutes * 60 + seconds;

  const timeTotalSec = typeof timer.timeTotal === 'string'
    ? timer.timeTotal.split(':').reduce((acc, val, idx) => acc + parseInt(val) * (idx === 0 ? 60 : 1), 0)
    : timer.timeTotal || 0;

  return timeTotalSec > 0 ? 1 - (totalSeconds / timeTotalSec) : 0;
};