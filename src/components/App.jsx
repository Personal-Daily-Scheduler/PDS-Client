import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Login from "./Login";
import Layout from "./Layout";
import Plans from "./Plans";
import Schedules from "./Schedules";
import TextEditor from "./See";
import TabUI from "./TabUI";
import Modal from "../shared/Modal";
import PlanForm from "./PlanForm";

import NotoSansKR from "../assets/fonts/NotoSansKR-VariableFont_wght.ttf";

import useMobileStore from "../store/useMobileStore";

function App() {
  const [viewMode, setViewMode] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isMobile, setIsMobile } = useMobileStore();

  const handleModalToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 748) {
        setIsMobile(true);
      } else {
        setViewMode("home");
      }

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
                      <BlurOverlay>
                        <MessageWrapper>
                          <h3>잠깐! 모바일 화면이신가요?</h3>
                          <Message>{"브라우저에서만 제공되는 기능입니다.\n오늘 일정을 한 화면에 보기 원하시면 \n브라우저에서 접속해서 이용해주세요. 🥲"}</Message>
                        </MessageWrapper>
                      </BlurOverlay>
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
                {isMobile && <TabUI onClickAddPlan={handleModalToggle} onViewModeChange={handleViewModeChange} />}
                {isModalOpen && (
                  <Modal onClose={handleModalToggle} darkBackground>
                    <PlanForm onClose={handleModalToggle} />
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
  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansKR}) format('truetype');
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  backdrop-filter: blur(4px);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 300px;
  height: 20%;
  background-color: white;
  padding: 20px 0;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Message = styled.span`
  justify-content: center;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  white-space: pre-wrap;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ viewMode }) => (viewMode === "home" ? "space-between" : "center")};
  flex-wrap: wrap;
  min-width: 360px;
`;

export default App;
