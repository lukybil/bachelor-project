import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../atoms/Button';
import GameTitle from '../atoms/GameTitle';
import Select from '../atoms/Select';
import { DIFFICULTY, MAZE_SIZE } from '../constants';
import Game from '../molecules/Game';
import { SPACING } from '../style/style';
import { COLOR_CONTRAST_PRIMARY } from '../style/theme';
import { Difficulty } from '../types/Difficulty';
import { GameFinishReason } from '../types/GameFinishReason';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.easy);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  );
  const size = useMemo(() => MAZE_SIZE[difficulty], [difficulty]);
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const handleCancelClick = () => {
    setIsPlaying(false);
  };
  const handleDifficultyChange = (value: string | null) => {
    setDifficulty((value ?? 'easy') as Difficulty);
  };
  const handleGameStart = useCallback(() => {
    setTimer(setInterval(() => setSeconds((old) => old + 1), 1000));
  }, [setTimer, setSeconds]);
  const handleGameFinish = useCallback(
    (reason: GameFinishReason) => {
      if (timer) clearInterval(timer);
      setSeconds(0);
      if (reason === GameFinishReason.win) {
        alert('You won!');
      }
    },
    [setTimer, setSeconds]
  );

  useEffect(
    () => () => {
      if (timer) clearInterval(timer);
    },
    [timer]
  );

  const mazeSizes = Object.entries(MAZE_SIZE).map(([key, value]) => ({
    value: key,
    text: `${DIFFICULTY[key as Difficulty]} (${value.width} x ${value.height})`,
  }));

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isPlaying ? (
        <>
          <GameTitle
            difficulty={difficulty}
            seconds={seconds}
            style={{ marginBottom: SPACING.sm }}
          />
          <Game
            cols={size.width}
            rows={size.height}
            onStart={handleGameStart}
            onFinish={handleGameFinish}
          />
          <Button onClick={handleCancelClick} style={{ marginTop: SPACING.md }}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <h3 style={{ color: COLOR_CONTRAST_PRIMARY }}>Choose difficulty</h3>
          <Select
            options={mazeSizes}
            value={difficulty}
            onChange={handleDifficultyChange}
            outerStyle={{ marginBottom: SPACING.sm }}
          />
          <Button onClick={handlePlayClick}>Play!</Button>
        </>
      )}
    </div>
  );
};

export default Play;
