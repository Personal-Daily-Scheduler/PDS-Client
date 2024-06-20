import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CustomCalendar from "../Calendar";

import calendarIcon from "../../assets/calendar_icon.png";
import profileIcon from "../../assets/profile_icon.png";
import logoutIcon from "../../assets/logout_icon.png";
import sidebarIcon from "../../assets/hamburger_icon.png";
import SidebarCloseIcon from "../../assets/toggle_close_icon.png";

import useScheduleStore from "../../store/schedules";
import useCalendarStore from "../../store/calender";
import usePlanStore from "../../store/plans";
import useDiaryStore from "../../store/diary";
import useUserStore from "../../store/user";
import useMobileStore from "../../store/useMobileStore";
import IconTextButton from "../../shared/IconButton";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { username, clearUser } = useUserStore();
  const { clearCalendar } = useCalendarStore();
  const { clearSchedules } = useScheduleStore();
  const { clearPlan } = usePlanStore();
  const { clearDiary } = useDiaryStore();
  const { isMobile } = useMobileStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("guestUser");
    clearCalendar();
    clearSchedules();
    clearPlan();
    clearUser();
    clearDiary();
    navigate("/");
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen} isMobile={isMobile}>
      {!isMobile && (
        <ToggleButton isSidebarOpen={isSidebarOpen}>
          <IconTextButton iconSrc={isSidebarOpen ? SidebarCloseIcon : sidebarIcon} onClick={toggleSidebar} size="20px" />
        </ToggleButton>
      )}
      {isSidebarOpen && (
        <>
          <ProfileWrapper>
            <ProfileIcon src={profileIcon} alt="Profile Icon" />
            <ProfileText>{username}</ProfileText>
          </ProfileWrapper>
          <MenuWrapper onClick={toggleCalendar}>
            <MenuIcon src={calendarIcon} alt="Calendar Icon" />
            <MenuText>Calendar</MenuText>
          </MenuWrapper>
          {isCalendarOpen && (
            <CalendarWrapper>
              <CustomCalendar />
            </CalendarWrapper>
          )}
          <Spacer />
          <MenuWrapper onClick={handleLogout}>
            <MenuIcon src={logoutIcon} alt="Logout Icon" />
            <MenuText>Logout</MenuText>
          </MenuWrapper>
        </>
      )}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${({ isSidebarOpen, isMobile }) => (isSidebarOpen ? "250px" : isMobile ? "0px" : "40px")};
  background-color: #f5f5f5;
  transition: width 0.3s ease;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 20px 0;
  align-self: ${({ isSidebarOpen }) => (isSidebarOpen ? "flex-end" : "center")};
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const MenuWrapper = styled.div`
  display: flex;
  width: 230px;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const MenuIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const CalendarWrapper = styled.div`
  margin: 20px 0;
`;

export default Sidebar;
