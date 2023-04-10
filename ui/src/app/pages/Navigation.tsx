import { Outlet } from 'react-router-dom';
import NavigationBar from '../organisms/NavigationBar';

const Navigation = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
