import React from 'react';
import styled from 'styled-components';
import PDSLogoImage from '../../assets/pds_logo.png';

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <PDSLogo src={PDSLogoImage} alt="PDS Logo" />
        <Title>P.D.S</Title>
      </Logo>

      <DateContainer>
        <ArrowButton>{'<'}</ArrowButton>
        <h2>Today Date</h2>
        <ArrowButton>{'>'}</ArrowButton>
      </DateContainer>

      <ViewModeSelect>
        <option value="daily">Daily View</option>
        <option value="weekly">Weekly View</option>
      </ViewModeSelect>
    </HeaderContainer>
  );
}

const PDSLogo = styled.img`
  width: 40px;
  height: 40px;
`;

const HeaderContainer = styled.header`
  color: black;
  padding: 1em;
  text-align: center;
  display: flex;
  position: fixed;
  width: 100%;
  height:70px;
  justify-content: space-between;
  align-items: center;
  top: 0;
`;

const Logo = styled.div`
  display: flex;
  width: 260px;
  align-items: center;
`;

const Title = styled.h1`
  margin-left: 10px;
  font-family: 'Philosopher', sans-serif;
  font-size: 35px;
  font-weight: 700;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 2em;
  cursor: pointer;
  margin: 0 10px;
`;

const ViewModeSelect = styled.select`
  background-color: #3b5998;
  color: #fff;
  border: none;
  padding-right: 5px;
  cursor: pointer;
`;

export default Header;
