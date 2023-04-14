import { HTMLProps } from 'react';
import styled from 'styled-components';
import { COLOR_CONTRAST_PRIMARY } from '../style/theme';

interface PlayerProps {
  x: number;
  y: number;
  cellSize: number;
}

const StyledDiv = styled.div<HTMLProps<HTMLDivElement> & { size: number }>`
  background-color: ${COLOR_CONTRAST_PRIMARY};
  position: absolute;
  border-radius: 50%;
  ${({ size }) => `width: ${size}px; height: ${size}px;`}
`;

const Player = ({ x, y, cellSize }: PlayerProps) => {
  return (
    <StyledDiv
      size={cellSize}
      style={{ top: `${y * cellSize}px`, left: `${x * cellSize}px` }}
    />
  );
};

export default Player;
