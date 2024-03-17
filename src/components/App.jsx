import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import Layout from './Layout';
import Plans from './Plans';
import Schedules from './Schedules';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/users"
          exact
          element={(
            <Wrapper>
              <Plans />
              <Schedules />
            </Wrapper>
        )}
        />
      </Route>
    </Routes>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
