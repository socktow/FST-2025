import Barontime from '../../components/Timmer/Barontime';
import Dragontime from '../../components/Timmer/Dragontime';
import Atakhantime from '../../components/Timmer/Atakhantime';

const Timer = ({ gameTime, baronTimer, dragonTimer, atakhanTimer, scoreboard = [] }) => {
  const gameTimeInSeconds = typeof gameTime === 'string'
    ? parseInt(gameTime.split(':')[0]) * 60 + parseInt(gameTime.split(':')[1])
    : gameTime;

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <Barontime timer={baronTimer} scoreboard={scoreboard} gameTime={gameTime} />
      <Dragontime timer={dragonTimer} />
      {gameTimeInSeconds >= 900 && (
        <Atakhantime timer={atakhanTimer} />
      )}
    </div>
  );
};

export default Timer;