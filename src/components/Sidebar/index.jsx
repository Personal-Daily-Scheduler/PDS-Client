import React, { useState } from 'react';
import styled from 'styled-components';
import CustomCalendar from '../Calendar';

import calendarIcon from '../../assets/calendar_icon.png';
import todayIcon from '../../assets/today_icon.png';
import addTaskIcon from '../../assets/add_icon.png';
import profileIcon from '../../assets/profile_icon.png';
import logoutIcon from '../../assets/logout_icon.png';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleLogout = () => {
    console.log('Request Logout');
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
        {isSidebarOpen ? '<' : '>'}
      </ToggleButton>
      <div>
        {isSidebarOpen && (
          <>
            <MenuWrapper>
              {IconButton(profileIcon)}
              <ProfileText>고경준 님</ProfileText>
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
      </div>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '300px' : '50px')};
  overflow: hidden;
  background-color: #1877f2;
  padding: ${({ isSidebarOpen }) => (isSidebarOpen ? '10px' : '0px')};
  margin-top: 70px;
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
