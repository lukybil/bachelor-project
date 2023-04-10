import { HTMLProps } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { DURATION, SPACING } from '../style/style';
import {
  COLOR_SECONDARY,
  COLOR_TERTIARY,
  COLOR_TEXT_SECONDARY,
} from '../style/theme';

interface NavButtonProps extends NavLinkProps {
  children: React.ReactNode;
}

const StyledLink = styled.span<
  HTMLProps<HTMLSpanElement> & { isActive: boolean }
>`
  font-weight: bold;
  text-decoration: none;
  padding: ${SPACING.md};
  color: ${COLOR_TEXT_SECONDARY};
  display: inline-block;
  border-radius: ${SPACING.md};
  &:hover {
    background-color: ${COLOR_SECONDARY};
    color: ${COLOR_TERTIARY};
  }
  transition: background-color ${DURATION.md}, color ${DURATION.md};
  ${({ isActive }) =>
    isActive && {
      color: COLOR_TERTIARY,
    }}
`;

const NavButton = ({ children, ...rest }: NavButtonProps) => {
  return (
    <NavLink {...rest} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <StyledLink isActive={isActive}>{children}</StyledLink>
      )}
    </NavLink>
  );
};

export default NavButton;
