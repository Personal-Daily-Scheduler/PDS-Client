import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header';
import Sidebar from '../Sidebar';

import formatDateToYYYYMMDD from '../../utils/formatDate';
import fetchUserPlans from '../../services/plan/fetchGetPlans';
import fetchUserSchedules from '../../services/schedule/fetchGetSchedules';
import fetchPostDiary from '../../services/diary/fetchPostDiary';
import fetchUserDiaries from '../../services/diary/fetchGetDiary';
import useDiaryStore from '../../store/diary';

import useCalendarStore from '../../store/calender';
import useUserStore from '../../store/user';
import usePlanStore from '../../store/plans';
import useScheduleStore from '../../store/schedules';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { setUser } = useUserStore();
  const { setPlan } = usePlanStore();
  const { setSchedule } = useScheduleStore();
  const { saveDiary } = useDiaryStore();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchSchedules = async (user) => {
    const response = await fetchUserSchedules(user);

    if (!response.result) {
      console.error(response.message);
    }

    for (const dailySchedule of response.data) {
      for (const scheduleObject of dailySchedule.schedules) {
        setSchedule(scheduleObject);
      }
    }
  };

  const fetchPlans = async (user) => {
    const savedPlanArray = await fetchUserPlans(user);

    for (const dailyPlan of savedPlanArray) {
      for (const planObject of dailyPlan.plans) {
        setPlan(planObject);
      }
    }
  };

  const fetchDiaries = async (user) => {
    const userDiaries = await fetchUserDiaries(user);

    if (userDiaries.result) {
      for (const dailyDiary of userDiaries) {
        saveDiary(dailyDiary);
      }
    }
  };

  useEffect(() => {
    const todayDate = formatDateToYYYYMMDD(new Date());

    if (!selectedDate) {
      setSelectedDate(todayDate);
    }

    const member = JSON.parse(sessionStorage.getItem('authenticatedUser'));
    const guest = JSON.parse(sessionStorage.getItem('guestUser'));

    if (member) {
      setUser({
        userId: member.userId,
        username: member.username,
      });

      fetchSchedules(member);
      fetchPlans(member);
      fetchDiaries(member);

      return;
    } if (guest) {
      setUser({
        userId: guest.userId,
        username: guest.username,
      });

      return;
    }

    alert('로그인이 필요한 페이지입니다.');

    navigate('/');
  }, []);

  return (
    <>
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
  border-top: 3px solid #d9d9d9;
  flex-grow: 1;
  margin-top: 70px;
  padding: 20px;
  transition: margin-left 0.3s ease;
`;

export default Layout;
