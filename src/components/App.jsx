import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Login from "./Login";
import Layout from "./Layout";
import Plans from "./Plans";
import Schedules from "./Schedules";
import TextEditor from "./See";

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
                <Plans className="horizontal" />
                <Schedules className="horizontal" />
                <TextEditor className="horizontal vertical" />
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
  justify-content: space-between;
  flex-wrap: nowrap;
  transition: all 0.3s ease-in-out;

  .horizontal {
    flex-basis: calc(33.33% - 20px);
    background-color: #f1f1f1;
    margin: 0;
    margin-right: 20px;
    text-align: center;
    transition: flex-basis 0.3s ease-in-out;

    &:last-child {
      margin-right: 0;
    }

    @media screen and (max-width: 900px) and (min-width: 651px) {
      flex-basis: calc(50% - 10px);
      margin-right: 10px;
      margin-bottom: 10px;

      &:last-child {
        margin-right: 0;
      }
    }

    @media screen and (max-width: 650px) {
      flex-basis: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .vertical {
    @media screen and (max-width: 900px) {
      flex-basis: 100%;
      margin-right: 0;
    }
  }

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

export default App;
