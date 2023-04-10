import styled from 'styled-components';
import NavButton from '../atoms/NavButton';
import UserProfile from '../molecules/UserProfile';
import { SPACING } from '../style/style';
import { COLOR_PRIMARY } from '../style/theme';

const Nav = styled.nav`
  ${() => ({
    backgroundColor: COLOR_PRIMARY,
    display: 'grid',
    flexDirection: 'row',
    padding: SPACING.sm,
    gap: SPACING.sm,
    justifyContent: 'center',
    gridTemplateColumns: '1fr auto 1fr',
    justifyItems: 'center',
    '&>*': {
      display: 'flex',
      flexDirection: 'row',
    },
  })}
`;

const NavigationBar = () => {
  return (
    <Nav>
      <div style={{ justifySelf: 'start' }}></div>
      <div style={{ gap: SPACING.sm }}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/leader-boards">Leader boards</NavButton>
      </div>
      <div style={{ justifySelf: 'end' }}>
        <UserProfile />
      </div>
    </Nav>
  );
};

export default NavigationBar;
