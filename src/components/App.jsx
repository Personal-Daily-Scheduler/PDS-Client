import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Login from "./Login";
import Layout from "./Layout";
import Plans from "./Plans";
import Schedules from "./Schedules";
import TextEditor from "./See";
import TabUI from "./TabUI";

import useMobileStore from "../store/useMobileStore";

function App() {
  const [viewMode, setViewMode] = useState("all");
  const { isMobile, setIsMobile } = useMobileStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 748);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

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
              <>
                <Wrapper>
                  {(viewMode === "all" || viewMode === "plans") && <Plans />}
                  {(viewMode === "all" || viewMode === "schedules") && <Schedules />}
                  {(viewMode === "all" || viewMode === "editor") && <TextEditor />}
                </Wrapper>
                {isMobile && <TabUI onViewModeChange={handleViewModeChange} />}
              </>
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
`;

export default App;
