import { HTMLProps } from 'react';
import styled from 'styled-components';
import { DIFFICULTY } from '../constants';
import { FONT_SIZE, SPACING } from '../style/style';
import { COLOR_CONTRAST_PRIMARY } from '../style/theme';
import { Difficulty } from '../types/Difficulty';
import { zeroPad } from '../utils/zeroPad';

interface GameTitleProps extends HTMLProps<HTMLDivElement> {
  seconds: number;
  difficulty: Difficulty;
}

const Stack = styled.div`
  display: flex;
  flex-direction: row;
  justift-content: start;
  align-items: center;
`;

const Text = styled.span`
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
`;

const GameTitle = ({ seconds, difficulty, ...rest }: GameTitleProps) => {
  const time = `${zeroPad(Math.floor(seconds / 60))}:${zeroPad(seconds % 60)}`;
  return (
    <Stack style={rest.style}>
      <Text style={{ color: COLOR_CONTRAST_PRIMARY }}>
        {DIFFICULTY[difficulty]}
      </Text>
      <Text style={{ marginLeft: SPACING.sm, marginRight: SPACING.sm }}>-</Text>
      <Text>{time}</Text>
    </Stack>
  );
};

export default GameTitle;
