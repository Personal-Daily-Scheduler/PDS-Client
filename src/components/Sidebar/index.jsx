import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CustomCalendar from '../Calendar';

import useUserStore from '../../store/user';
import useCalendarStore from '../../store/calender';
import usePlanStore from '../../store/plans';

import calendarIcon from '../../assets/calendar_icon.png';
import todayIcon from '../../assets/today_icon.png';
import addTaskIcon from '../../assets/add_icon.png';
import profileIcon from '../../assets/profile_icon.png';
import logoutIcon from '../../assets/logout_icon.png';
import useScheduleStore from '../../store/schedules';
import useDiaryStore from '../../store/diary';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { username, clearUser } = useUserStore();
  const { clearCalendar } = useCalendarStore();
  const { clearSchedules } = useScheduleStore();
  const { clearPlan } = usePlanStore();
  const { clearDiary } = useDiaryStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('guestUser');

    clearCalendar();
    clearSchedules();
    clearPlan();
    clearUser();
    clearDiary();

    navigate('/');
  };

  function IconButton(imageUri) {
    return (
      <Button>
        <img
          src={imageUri}
          alt="Button Icon"
          width="25px"
          height="25px"
        />
      </Button>
    );
  }

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <ToggleButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
        {isSidebarOpen ? '×' : '☰'}
      </ToggleButton>
      {isSidebarOpen && (
        <>
          <MenuWrapper>
            {IconButton(profileIcon)}
            <ProfileText>{username}</ProfileText>
          </MenuWrapper>
          <MenuWrapper>
            {IconButton(addTaskIcon)}
            <Button>Add Task</Button>
          </MenuWrapper>
          <MenuWrapper>
            {IconButton(todayIcon)}
            <Button>Today</Button>
          </MenuWrapper>
          <MenuWrapper>
            {IconButton(calendarIcon)}
            <Button>Calendar</Button>
          </MenuWrapper>
          <CustomCalendar />
          <MenuWrapper onClick={handleLogout}>
            {IconButton(logoutIcon)}
            <LogoutButtonText>Logout</LogoutButtonText>
          </MenuWrapper>
        </>
      )}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '50px')};
  overflow: auto;
  background-color: #1877f2;
  padding: ${({ isSidebarOpen }) => (isSidebarOpen ? '10px' : '0px')};
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 8px;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  border-radius: 8px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const ProfileText = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 700;

  ${MenuWrapper}:hover & {
    color: white;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  color: black;
  font-weight: 700;
  margin-right: 5px;

  ${MenuWrapper}:hover & {
    color: white;
  }
`;

const LogoutButtonText = styled.h2`
  font-size: 20px;
  color: black;
  font-weight: 700;
  margin-left: 10px;

  ${MenuWrapper}:hover & {
    color: white;
  }
`;

export default Sidebar;
