import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import { DIFFICULTY, MAZE_SIZE } from '../constants';
import { useInitWasmModule } from '../hooks/useInitWasmModule';
import Game, { GameHandle } from '../organisms/Game';
import { SPACING } from '../style/style';
import { COLOR_CONTRAST_PRIMARY } from '../style/theme';
import { Difficulty } from '../types/Difficulty';
import { GameFinishReason } from '../types/GameFinishReason';
import { WasmModule } from '../types/WasmModule';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.easy);
  const gameRef = useRef<GameHandle>(null);
  useInitWasmModule(WasmModule.mazeGeneration);
  const handlePlayClick = () => {
    setIsPlaying(true);
    gameRef.current?.start();
  };
  const handleCancelClick = () => {
    setIsPlaying(false);
    gameRef.current?.stop();
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

  const mazeSizes = useMemo(
    () =>
      Object.entries(MAZE_SIZE).map(([key, value]) => ({
        value: key,
        text: `${DIFFICULTY[key as Difficulty]} (${value.width} x ${value.height})`,
      })),
    []
  );

  useEffect(
    () => () => {
      console.log('unmounting Play');
    },
    []
  );

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
      <Game ref={gameRef} difficulty={difficulty} onStart={handleGameStart} onFinish={handleGameFinish} />
      {isPlaying ? (
        <Button id="cancel-button" onClick={handleCancelClick} style={{ marginTop: SPACING.md }}>
          Cancel
        </Button>
      ) : (
        <>
          <h3 style={{ color: COLOR_CONTRAST_PRIMARY }}>Choose difficulty</h3>
          <Select
            id="game-mode-select"
            options={mazeSizes}
            value={difficulty}
            onChange={handleDifficultyChange}
            outerStyle={{ marginBottom: SPACING.sm }}
          />
          <Button onClick={handlePlayClick} id="play-button">
            Play!
          </Button>
        </>
      )}
    </div>
  );
};

export default Play;
