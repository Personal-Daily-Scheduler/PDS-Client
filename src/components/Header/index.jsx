import React from 'react';
import styled from 'styled-components';

import useCalendarStore from '../../store/calender';

import pdsLogo from '../../assets/pds_logo.png';
import formatDateToYYYYMMDD from '../../utils/formatDate';

function Header() {
  const { selectedDate, setSelectedDate } = useCalendarStore();

  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);

    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const formattedDate = formatDateToYYYYMMDD(currentDate);

    setSelectedDate(formattedDate);
  };

  return (
    <HeaderContainer>
      <Logo>
        <PDSLogo src={pdsLogo} alt="PDS Logo" />
        <Title>P.D.S</Title>
      </Logo>

      <DateContainer>
        <ArrowButton onClick={() => handleDateChange('prev')}>{'<'}</ArrowButton>
        <h2>{selectedDate}</h2>
        <ArrowButton onClick={() => handleDateChange('next')}>{'>'}</ArrowButton>
      </DateContainer>

      <ViewModeSelect>
        <option value="daily">Daily View</option>
        <option value="weekly">Weekly View</option>
      </ViewModeSelect>
    </HeaderContainer>
  );
}

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

const PDSLogo = styled.img`
  width: 40px;
  height: 40px;
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

const Title = styled.h1`
  margin-left: 10px;
  font-family: 'Philosopher', sans-serif;
  font-size: 35px;
  font-weight: 700;
`;

const ViewModeSelect = styled.select`
  background-color: #3b5998;
  color: #fff;
  border: none;
  padding-right: 5px;
  cursor: pointer;
`;

export default Header;
