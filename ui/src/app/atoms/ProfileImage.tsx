import { HTMLProps } from 'react';
import styled from 'styled-components';
import { ICON_SIZE, Size } from '../style/style';

const StyledImage = styled.img<ProfileImageProps>`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  ${({ sizeVariant }) => ({
    width: ICON_SIZE[sizeVariant],
  })}
`;

interface ProfileImageProps extends HTMLProps<HTMLImageElement> {
  sizeVariant: Size;
}

const ProfileImage = ({ sizeVariant = 'md', ...rest }: ProfileImageProps) => {
  // @ts-ignore
  return <StyledImage sizeVariant={sizeVariant} {...rest} />;
};

export default ProfileImage;
