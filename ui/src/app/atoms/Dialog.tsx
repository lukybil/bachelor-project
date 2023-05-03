import { HTMLAttributes } from 'react';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import { BREAKPOINT, SPACING } from '../style/style';
import { COLOR_DARK_FILTER, COLOR_TEXT_SECONDARY } from '../style/theme';
import ClickAwayListener from './ClickAwayListener';
import IconButton from './IconButton';

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
  max-height: calc(100vh - ${SPACING.lg} * 2);
  max-width: calc(min(100vw, ${BREAKPOINT.md}) - ${SPACING.md} * 2);
  background-color: ${COLOR_TEXT_SECONDARY};
  padding: ${SPACING.lg};
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-radius: ${SPACING.md};
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
        <Container {...rest}>
          <IconButton
            id="close-dialog-button"
            style={{ position: 'absolute', top: 0, right: 0 }}
            variant="plain"
            onClick={onClose}
          >
            <GrClose />
          </IconButton>
          {children}
        </Container>
      </ClickAwayListener>
    </Background>
  );
};

export default Dialog;
