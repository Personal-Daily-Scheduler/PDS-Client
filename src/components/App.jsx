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
import Modal from "../shared/Modal";
import PlanForm from "./PlanForm";

function App() {
  const [viewMode, setViewMode] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isMobile, setIsMobile } = useMobileStore();

  const handleOpenModal = (e) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                <Wrapper viewMode={viewMode}>
                  {(isMobile && viewMode === "home") ? (
                    <>
                      <Plans viewMode={viewMode} />
                      <Schedules viewMode={viewMode} />
                      <TextEditor viewMode={viewMode} />
                    </>
                  ) : (
                    <>
                      {(viewMode === "home" || viewMode === "plans") && <Plans />}
                      {(viewMode === "home" || viewMode === "schedules") && <Schedules />}
                      {(viewMode === "home" || viewMode === "editor") && <TextEditor />}
                    </>
                  )}
                </Wrapper>
                {isMobile && <TabUI onClickAddPlan={handleOpenModal} onViewModeChange={handleViewModeChange} />}
                {isModalOpen
                  && (
                  <Modal onClose={handleCloseModal} darkBackground>
                    <PlanForm onClose={handleCloseModal} />
                  </Modal>
                  )}
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
  justify-content: ${({ viewMode }) => (viewMode === "home" ? "space-between" : "center")};
  flex-wrap: wrap;
  min-width: 360px;
`;

export default App;
