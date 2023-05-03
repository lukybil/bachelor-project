import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Dialog from '../atoms/Dialog';
import Input from '../atoms/Input';
import { useResizeImage } from '../hooks/useResizeImage';
import { useAppSelector } from '../state/hooks';
import { SPACING } from '../style/style';
import { COLOR_PRIMARY, COLOR_TERTIARY } from '../style/theme';

interface ImagePickerProps {
  onClose: () => void;
}

const Stack = styled.div`
  // min-width: 300px;
  // min-height: 400px;
  min-height: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.sm};
  &:first-child {
    flex: 1;
  }
  &:nth-child(2) {
    flex: 0;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  box-sizing: border-box;
`;

const Selection = styled.div`
  position: absolute;
  margin: auto;
  border: 3px solid ${COLOR_PRIMARY};
`;

const ImagePicker = ({ onClose }: ImagePickerProps) => {
  const { profileImage } = useAppSelector((state) => state.user);
  const [image, setImage] = useState<string | null>(profileImage);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [fileSize, setFileSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const resizeImage = useResizeImage();

  useEffect(() => {
    if (!imageRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (imageRef.current) {
        setSize({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      }
    });
    resizeObserver.observe(imageRef.current);
    return () => resizeObserver.disconnect();
  }, [image, imageRef]);

  const selectionSize = useMemo(() => (size.width > size.height ? size.height : size.width), [size]);

  const handleChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    setLoading(true);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result?.toString() ?? null);
      setFileSize(file.size);
      setLoading(false);
    };
    // const fileUrl = URL.createObjectURL(file);
    // setImage(fileUrl);
  };

  const handleResize = async () => {
    if (image) {
      const resized = await resizeImage(image, 400, 400, fileSize);
      setImage(resized);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <Stack>
        <ImageContainer>
          {image && (
            <img
              src={image}
              alt="picking profile"
              ref={imageRef}
              style={{
                flex: 1,
                minHeight: 0,
                width: 'fit-content',
                objectFit: 'contain',
              }}
            />
          )}
          <Selection style={{ width: selectionSize, height: selectionSize }}>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: `1px solid ${COLOR_PRIMARY}`,
                backgroundColor: COLOR_TERTIARY,
                color: COLOR_PRIMARY,
              }}
            >
              selection
            </div>
          </Selection>
        </ImageContainer>
        <div style={{ display: 'flex', flexDirection: 'row', gap: SPACING.md }}>
          <Input id="profile-image-input" onChange={handleChange} type="file" />
          <Button variant="contained" onClick={handleResize} disabled={loading} id="crop-button">
            Crop
          </Button>
        </div>
      </Stack>
    </Dialog>
  );
};

export default ImagePicker;
