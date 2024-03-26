import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from '../Calendar';
import useUserStore from '../../store/user';
import useCalendarStore from '../../store/calender';
import usePlanStore from '../../store/plans';
import calendarIcon from '../../assets/calendar_icon.png';
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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <ToggleButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
        {isSidebarOpen ? '×' : '☰'}
      </ToggleButton>
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
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '250px' : '20px')};
  background-color: #f5f5f5;
  padding: 20px;
  transition: width 0.3s ease;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 20px;
  align-self: ${({ isSidebarOpen }) => (isSidebarOpen ? 'flex-end' : 'center')};
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
