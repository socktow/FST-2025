import { useMemo } from "react";
import TimerItem from './TimerItem';
import { getLightColor, calculateProgress } from './utils';

const Dragontime = ({ timer }) => {
  const progress = calculateProgress(timer);
  const strokeColor = useMemo(() => getLightColor('dragon'), ['dragon']);

  const renderProgressCircle = () => {
    return (
      <svg
        className="absolute top-0 left-0 w-8 h-8 -rotate-90"
        viewBox="0 0 8 8"
      >
        <circle
          stroke={strokeColor}
          strokeWidth="1"
          fill="transparent"
          r="3.4"
          cx="4"
          cy="4"
          strokeDasharray="22"
          strokeDashoffset={(1 - (progress < 0 ? 1 : Math.min(progress, 1))) * (22.5 - 1) + 1}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return <TimerItem timer={timer}>{renderProgressCircle()}</TimerItem>;
};

export default Dragontime;
