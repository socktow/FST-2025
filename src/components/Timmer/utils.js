export const getLightColor = (bgColor) => {
  switch (bgColor) {
    default: return '#FFFFFF';
  }
};

export const calculateProgress = (timer, isSecondVoidgrub = false) => {
  if (!timer) return 0;

  const [minutes, seconds] = timer.timeLeft?.split(':').map(Number) || [0, 0];
  const totalSeconds = minutes * 60 + seconds;

  if (isSecondVoidgrub) {
    return 1 - (totalSeconds / 240);
  } else {
    const timeTotalSec = typeof timer.timeTotal === 'string'
      ? timer.timeTotal.split(':').reduce((acc, val, idx) => acc + parseInt(val) * (idx === 0 ? 60 : 1), 0)
      : timer.timeTotal || 0;

    return timeTotalSec > 0 ? 1 - (totalSeconds / timeTotalSec) : 0;
  }
};