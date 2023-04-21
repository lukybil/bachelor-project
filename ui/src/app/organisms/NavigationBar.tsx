import { SiWebassembly } from 'react-icons/si';
import styled from 'styled-components';
import NavButton from '../atoms/NavButton';
import { USING_WASM } from '../constants';
import { useInitWasmModule } from '../hooks/useInitWasmModule';
import UserProfile from '../molecules/UserProfile';
import { SPACING } from '../style/style';
import { COLOR_PRIMARY } from '../style/theme';
import { WasmModule } from '../types/WasmModule';

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
  useInitWasmModule(WasmModule.imageResize);
  return (
    <Nav>
      <div style={{ justifySelf: 'start' }}>
        {USING_WASM && (
          <div>
            <span>Using</span>
            <SiWebassembly />
          </div>
        )}
      </div>
      <div style={{ gap: SPACING.sm }}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/play">Play</NavButton>
        <NavButton to="/leader-boards">Leader boards</NavButton>
      </div>
      <div style={{ justifySelf: 'end' }}>
        <UserProfile />
      </div>
    </Nav>
  );
};

export default NavigationBar;
