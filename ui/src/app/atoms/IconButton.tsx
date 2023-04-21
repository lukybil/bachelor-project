import styled from 'styled-components';
import { SPACING } from '../style/style';
import { COLOR_PRIMARY } from '../style/theme';
import Button, { ButtonProps } from './Button';

const Wrapper = styled.div`
  & svg {
    fill: ${COLOR_PRIMARY};
  }
`;

type IconButtonProps = ButtonProps;

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return (
    <Button {...rest} style={{ padding: SPACING.sm, ...rest.style }}>
      <Wrapper style={{ width: 16, height: 16 }}>{children}</Wrapper>
    </Button>
  );
};

export default IconButton;
