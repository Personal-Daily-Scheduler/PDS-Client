import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <GlobalStyles />
      <Header></Header>

      <Container>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Content isSidebarOpen={isSidebarOpen}>
          <Outlet />
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main`
  border-top: 3px solid #d9d9d9; /* 원하는 테두리 색상 및 굵기로 조절 */
  flex-grow: 1;
  margin-top: 70px;
  padding: 20px;
  transition: margin-left 0.3s ease;
`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default Layout;
