import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

const Home = () => {
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to={'/play'}>
        <Button>Go to the game</Button>
      </Link>
    </div>
  );
};

export default Home;
