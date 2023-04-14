import { useCallback, useState } from 'react';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import { DIFFICULTY, MAZE_SIZE } from '../constants';
import Game from '../organisms/Game';
import { SPACING } from '../style/style';
import { COLOR_CONTRAST_PRIMARY } from '../style/theme';
import { Difficulty } from '../types/Difficulty';
import { GameFinishReason } from '../types/GameFinishReason';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.easy);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const handleCancelClick = () => {
    setIsPlaying(false);
  };
  const handleDifficultyChange = (value: string | null) => {
    setDifficulty((value ?? 'easy') as Difficulty);
  };
  const handleGameStart = useCallback(() => false, []);
  const handleGameFinish = useCallback((reason: GameFinishReason) => {
    if (reason === GameFinishReason.win) {
      alert('You won!');
    }
  }, []);

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
          <Game
            difficulty={difficulty}
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
