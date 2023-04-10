import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { BREAKPOINT, SPACING } from '../style/style';
import { COLOR_DARK_FILTER, COLOR_TEXT_SECONDARY } from '../style/theme';
import ClickAwayListener from './ClickAwayListener';

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${COLOR_DARK_FILTER};
  z-index: 1000;
`;

const Container = styled.div`
  max-height: calc(100% - ${SPACING.lg} * 2);
  max-width: calc(min(100%, ${BREAKPOINT.md}) - ${SPACING.md} * 2);
  background-color: ${COLOR_TEXT_SECONDARY};
  padding: ${SPACING.lg};
`;

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

const Dialog = ({ open, onClose, children, ...rest }: DialogProps) => {
  if (!open) return null;
  return (
    <Background>
      <ClickAwayListener listen onClickAway={onClose} consumeEvent>
        <Container {...rest}>{children}</Container>
      </ClickAwayListener>
    </Background>
  );
};

export default Dialog;
