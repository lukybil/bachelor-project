import { useEffect } from 'react';

const GameTest = () => {
  useEffect(
    () => () => {
      console.log('unmounting');
    },
    []
  );
  return <div>GameTest</div>;
};

export default GameTest;
