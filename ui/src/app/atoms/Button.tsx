import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { FONT_SIZE, SPACING } from '../style/style';
import {
  COLOR_CONTRAST_PRIMARY,
  COLOR_CONTRAST_SECONDARY,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../style/theme';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'contained';
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

const Button = ({ variant = 'contained', children, ...rest }: ButtonProps) => {
  if (variant === 'contained') {
    return <ContainedButton {...rest}>{children}</ContainedButton>;
  }
  return <button {...rest}>{children}</button>;
};

export default Button;
