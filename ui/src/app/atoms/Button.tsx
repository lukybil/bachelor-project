import styled from 'styled-components';
import { FONT_SIZE, SPACING } from '../style/style';
import {
  COLOR_CONTRAST_PRIMARY,
  COLOR_CONTRAST_SECONDARY,
  COLOR_LIGHT_HIGHLIGHT,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../style/theme';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: 'contained' | 'plain';
}

const ContainedButton = styled.button`
  background-color: ${COLOR_CONTRAST_SECONDARY};
  border: 1px solid ${COLOR_CONTRAST_PRIMARY};
  border-radius: ${SPACING.md};
  font-size: ${FONT_SIZE.md};
  padding: ${SPACING.sm} ${SPACING.md};
  color: ${COLOR_PRIMARY};
  font-weight: bold;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${COLOR_TEXT_SECONDARY};
    background-color: ${COLOR_CONTRAST_PRIMARY};
  }
`;

const PlainButton = styled(ContainedButton)`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: ${COLOR_LIGHT_HIGHLIGHT};
  }
`;

const Button = ({ variant = 'contained', children, ...rest }: ButtonProps) => {
  if (variant === 'contained') {
    return <ContainedButton {...rest}>{children}</ContainedButton>;
  }
  if (variant === 'plain') {
    return <PlainButton {...rest}>{children}</PlainButton>;
  }
  return <button {...rest}>{children}</button>;
};

export default Button;
