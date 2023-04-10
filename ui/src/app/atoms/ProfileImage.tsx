import { HTMLProps } from 'react';
import styled from 'styled-components';
import { ICON_SIZE, Size } from '../style/style';
import { COLOR_DARK_FILTER } from '../style/theme';

const StyledImage = styled.img<ProfileImageProps>`
  width: 100%;
  height: 100%;
`;

const Container = styled.div<HTMLProps<HTMLDivElement> & { sizeVariant: Size }>`
  position: relative;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  &::after {
    width: 100%;
    height: 100%;
    background-color: ${COLOR_DARK_FILTER};
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    display: none;
    content: \"\";
  }
  ${({ sizeVariant }) => ({
    width: ICON_SIZE[sizeVariant],
  })}
  ${({ onClick }) =>
    onClick && {
      '&:hover': {
        cursor: 'pointer',
      },
      '&:hover::after': {
        display: 'block',
      },
    }}
`;

interface ProfileImageProps extends HTMLProps<HTMLImageElement> {
  sizeVariant: Size;
}

const ProfileImage = ({
  sizeVariant = 'md',
  onClick,
  ...rest
}: ProfileImageProps) => {
  return (
    <Container sizeVariant={sizeVariant} onClick={onClick}>
      {/* @ts-ignore */}
      <StyledImage {...rest} />
    </Container>
  );
};

export default ProfileImage;
