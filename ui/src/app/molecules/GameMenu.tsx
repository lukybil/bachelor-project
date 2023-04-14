import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import IconButton from '../atoms/IconButton';
import { FONT_SIZE, SPACING } from '../style/style';
import { Zoom } from '../types/Zoom';

const Stack = styled.div`
  display: flex;
  flex-direction: row;
  justift-content: start;
  align-items: center;
`;

const Text = styled.span`
  font-size: ${FONT_SIZE.md};
`;

interface GameMenuProps {
  onZoom: (zoomChange: Zoom) => void;
}

const GameMenu = ({ onZoom }: GameMenuProps) => {
  const handleZoomIn = () => onZoom(Zoom.in);
  const handleZoomOut = () => onZoom(Zoom.out);

  return (
    <Stack style={{ gap: SPACING.sm }}>
      <Text>Zoom</Text>
      <IconButton onClick={handleZoomIn}>
        <FaPlus />
      </IconButton>
      <IconButton onClick={handleZoomOut}>
        <FaMinus />
      </IconButton>
    </Stack>
  );
};

export default GameMenu;
