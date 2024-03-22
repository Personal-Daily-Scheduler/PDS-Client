import { Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './Login';
import Layout from './Layout';
import Plans from './Plans';
import Schedules from './Schedules';
import TextEditor from './See';

function App() {
  return (
    <>
      <GlobalStyle />
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
                <TextEditor />
              </Wrapper>
          )}
          />
        </Route>
      </Routes>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
