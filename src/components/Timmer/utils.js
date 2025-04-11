export const getBackgroundColor = (timer) => {
  if (!timer || !timer.subType) return "bg-black/40";

  const subtype = timer.subType.toLowerCase();
  if (subtype.includes('baron')) return 'bg-purple-600';

  if (subtype.includes('dragon')) {
    if (subtype.includes('fire')) return 'bg-orange-600';
    if (subtype.includes('air')) return 'bg-gray-400';
    if (subtype.includes('chemtech')) return 'bg-green-700';
    if (subtype.includes('earth')) return 'bg-yellow-800';
    if (subtype.includes('hextech')) return 'bg-cyan-600';
    if (subtype.includes('water')) return 'bg-gradient-to-b from-[#46746c] to-[#a1dacf]'; 
    if (subtype.includes('elder')) return 'bg-pink-600';
    return 'bg-black/40';
  }

  return 'bg-black/40';
};

export const getLightColor = (bgColor) => {
  switch (bgColor) {
    case 'bg-orange-600': return '#FFFFFf';
    case 'bg-gray-400': return '#FFFFFf';
    case 'bg-green-700': return '#FFFFFf';
    case 'bg-yellow-800': return '#FFFFFf';
    case 'bg-cyan-600': return '#FFFFFf';
    case 'bg-pink-600': return '#FFFFFf';
    case 'bg-purple-600': return '#FFFFFf';
    case 'bg-gradient-to-b from-[#46746c] to-[#a1dacf]': return '#FFFFFf';
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