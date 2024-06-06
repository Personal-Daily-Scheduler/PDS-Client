import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Login from "./Login";
import Layout from "./Layout";
import Plans from "./Plans";
import Schedules from "./Schedules";
import TextEditor from "./See";
import MobileError from "./MobileError";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobileDevice = () => {
      const { userAgent } = navigator;

      const mobileEnvironment = ["Mobi", "Android", "iPhone"];

      for (const keyword of mobileEnvironment) {
        if (userAgent.includes(keyword)) {
          return true;
        }
      }

      return false;
    };

    const isMobile = isMobileDevice();

    if (isMobile) {
      navigate("/mobileError");
    }
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <Main>
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
          <Route path="/mobileError" element={<MobileError />} />
        </Routes>
      </Main>
      <MobileNotification>
        <MobileError />
      </MobileNotification>
    </>
  );
}

const Main = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MobileNotification = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }

  display: none;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default App;
