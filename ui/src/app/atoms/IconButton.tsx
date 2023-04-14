import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { SPACING } from '../style/style';
import { COLOR_PRIMARY } from '../style/theme';
import Button from './Button';

const Wrapper = styled.div`
  & svg {
    fill: ${COLOR_PRIMARY};
  }
`;

type IconButtonProps = HTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return (
    <Button {...rest} style={{ padding: SPACING.sm }}>
      <Wrapper style={{ width: 16, height: 16 }}>{children}</Wrapper>
    </Button>
  );
};

export default IconButton;
