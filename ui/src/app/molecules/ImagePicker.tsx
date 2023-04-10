import Dialog from '../atoms/Dialog';

interface ImagePickerProps {
  onClose: () => void;
}

const ImagePicker = ({ onClose }: ImagePickerProps) => {
  return (
    <Dialog open onClose={onClose}>
      <div style={{ width: '300px', height: '300px' }}></div>
    </Dialog>
  );
};

export default ImagePicker;
