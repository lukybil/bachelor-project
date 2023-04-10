import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Game from './pages/Game';
import Home from './pages/Home';
import LeaderBoards from './pages/LeaderBoards';
import Navigation from './pages/Navigation';
import store from './store';

const StyledApp = styled.div``;

export function App() {
  return (
    <Provider store={store}>
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path="" Component={Navigation}>
              <Route path="/leader-boards" Component={LeaderBoards} />
              <Route path="/play" Component={Game} />
              <Route path="/" Component={Home} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </Provider>
  );
}

export default App;
