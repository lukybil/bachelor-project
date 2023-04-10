import { useState } from 'react';
import Button from '../atoms/Button';
import Game from '../molecules/Game';

const Play = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const handleCancelClick = () => {
    setIsPlaying(false);
  };

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
          <Game cols={100} rows={50} />
          <Button onClick={handleCancelClick}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handlePlayClick}>Play!</Button>
      )}
    </div>
  );
};

export default Play;
