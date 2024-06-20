import React, { useState } from "react";
import styled from "styled-components";

import formatDateToYYYYMMDD from "../../utils/formatDate";
import IconTextButton from "../../shared/IconButton";

import pdsLogo from "../../assets/pds_logo.png";
import todayIcon from "../../assets/today_icon.png";
import openedIcon from "../../assets/opened_icon.png";
import closedIcon from "../../assets/closed_icon.png";
import menuIcon from "../../assets/hamburger_icon.png";
import sidebarToggleCloseIcon from "../../assets/toggle_close_icon.png";

import useCalendarStore from "../../store/calender";
import useMobileStore from "../../store/useMobileStore";

function Header({ onClickSidebarToggle, isSidebarOpen }) {
  const [isOpenedCalendar, setIsOpendCalendar] = useState(false);

  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { isMobile } = useMobileStore();

  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);

    if (direction === "prev") {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    if (direction === "next") {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const formattedDate = formatDateToYYYYMMDD(currentDate);

    setSelectedDate(formattedDate);
  };

  const handleCalendarToggleButton = () => {
    setIsOpendCalendar(!isOpenedCalendar);
  };
  const handleTodayClick = () => {
    const todayDate = new Date();

    const formattedDate = formatDateToYYYYMMDD(todayDate);
    setSelectedDate(formattedDate);
  };

  return (
    <HeaderContainer mobileMode={isMobile}>
      {isMobile ? (
        <>
          {isSidebarOpen ? (
            <IconTextButton iconSrc={sidebarToggleCloseIcon} onClick={onClickSidebarToggle} size="25px"></IconTextButton>
          ) : (
            <IconTextButton iconSrc={menuIcon} onClick={onClickSidebarToggle} size="25px"></IconTextButton>
          )}
          <MobileDate>{selectedDate}</MobileDate>
          {isOpenedCalendar ? (
            <IconTextButton iconSrc={openedIcon} onClick={(e) => handleCalendarToggleButton()} size="30px"></IconTextButton>
          ) : (
            <IconTextButton iconSrc={closedIcon} onClick={(e) => handleCalendarToggleButton()} size="30px"></IconTextButton>
          )}
          <DateContainer>
            <ArrowButton onClick={() => handleDateChange("prev")}>{"<"}</ArrowButton>
            <ArrowButton onClick={() => handleDateChange("next")}>{">"}</ArrowButton>
            <IconTextButton iconSrc={todayIcon} onClick={handleTodayClick} size="30px" />
          </DateContainer>
        </>
      ) : (
        <>
          <Logo>
            <PDSLogo src={pdsLogo} alt="PDS Logo" />
            <Title>P.D.S</Title>
          </Logo>
          <DateContainer>
            <TodayButton onClick={handleTodayClick}>
              <img src={todayIcon} alt="Today Icon" />
              <span>Today</span>
            </TodayButton>
            <ArrowButton onClick={() => handleDateChange("prev")}>{"<"}</ArrowButton>
            <h2>{selectedDate}</h2>
            <ArrowButton onClick={() => handleDateChange("next")}>{">"}</ArrowButton>
          </DateContainer>
        </>
      )}

    </HeaderContainer>
  );
}

const MobileDate = styled.span`
  margin: 0 10px;
  font-size: 20px;
  font-weight: 800;
  word-break: keep-all;
  white-space: nowrap;
`;

const HeaderContainer = styled.header`
  color: black;
  padding: 10px;
  text-align: center;
  display: flex;
  position: fixed;
  width: 100%;
  height: ${(props) => (props.mobileMode ? "40px" : "60px")};
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const PDSLogo = styled.img`
  width: 40px;
  height: 30px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
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
  font-family: "Philosopher", sans-serif;
  font-size: 35px;
  font-weight: 700;
`;

const TodayButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 20px;

  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  span {
    font-size: 16px;
  }
`;

export default Header;
