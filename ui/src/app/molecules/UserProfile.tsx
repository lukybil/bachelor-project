import { HTMLProps, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import ClickAwayListener from '../atoms/ClickAwayListener';
import ProfileImage from '../atoms/ProfileImage';
import { useAppSelector } from '../state/hooks';
import { DURATION, ICON_SIZE, SPACING } from '../style/style';
import {
  COLOR_SECONDARY,
  COLOR_TERTIARY,
  COLOR_TEXT_SECONDARY,
} from '../style/theme';

const Container = styled.div<HTMLProps<HTMLSpanElement> & { isOpen: boolean }>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: background-color ${DURATION.md};
  padding: ${SPACING.sm};
  border-radius: ${SPACING.md};
  & path {
    fill: ${COLOR_SECONDARY};
    transition: fill ${DURATION.md};
  }
  &:hover {
    background-color: ${COLOR_SECONDARY};
  }
  &:hover path {
    fill: ${COLOR_TERTIARY};
  }
  ${({ isOpen }) =>
    isOpen && {
      backgroundColor: COLOR_SECONDARY,
      '& path': {
        fill: COLOR_TERTIARY,
      },
    }}
`;

const Popper = styled.div<HTMLProps<HTMLSpanElement> & { isOpen: boolean }>`
  position: absolute;
  visibility: hidden;
  display: flex;
  background-color: ${COLOR_TEXT_SECONDARY};
  top: calc(100%);
  right: 0;
  padding: ${SPACING.md};
  border-radius: ${SPACING.md};
  box-shadow: 3px 3px 5px 1px #888888;
  opacity: 0;
  transition: opacity ${DURATION.md},
    visibility 0s ${({ isOpen }) => !isOpen && DURATION.md};
  ${({ isOpen }) =>
    isOpen && {
      visibility: 'visible',
      opacity: 1,
    }}
`;

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { email, firstName, lastName, profileImage, username } = useAppSelector(
    (state) => state.user
  );

  const handleClick = () => {
    setOpen((old) => !old);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ClickAwayListener listen={open} onClickAway={() => setOpen(false)}>
        <Container isOpen={open} onClick={handleClick}>
          <FaUserCircle size={ICON_SIZE.md} />
        </Container>
        <Popper isOpen={open}>
          <ProfileImage
            sizeVariant="lg"
            src={profileImage}
            alt={`profile of ${username}`}
          />
          <h3 style={{ whiteSpace: 'nowrap' }}>User profile</h3>
        </Popper>
      </ClickAwayListener>
    </div>
  );
};

export default UserProfile;
