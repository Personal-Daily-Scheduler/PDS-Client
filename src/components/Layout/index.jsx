import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../Header";
import Sidebar from "../Sidebar";

import formatDateToYYYYMMDD from "../../utils/formatDate";
import fetchUserPlans from "../../services/plan/fetchGetPlans";
import fetchUserSchedules from "../../services/schedule/fetchGetSchedules";
import fetchUserDiaries from "../../services/diary/fetchGetDiary";
import SimpleModal from "../SimpleModal";
import Welcome from "../Welcome";

import useDiaryStore from "../../store/diary";
import useCalendarStore from "../../store/calender";
import useUserStore from "../../store/user";
import usePlanStore from "../../store/plans";
import useScheduleStore from "../../store/schedules";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

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
    const response = await fetchUserDiaries(user);

    if (response.result) {
      response.data.forEach((dailyDiary) => {
        saveDiary(dailyDiary.diary);
      });
    }
  };

  useEffect(() => {
    const todayDate = formatDateToYYYYMMDD(new Date());

    if (!selectedDate) {
      setSelectedDate(todayDate);
    }

    const member = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    const guest = JSON.parse(sessionStorage.getItem("guestUser"));

    if (member) {
      setUser({
        userId: member.userId,
        username: member.username,
      });

      fetchSchedules(member);
      fetchPlans(member);
      fetchDiaries(member);

      setIsWelcomeModalOpen(true);
      return;
    } if (guest) {
      setUser({
        userId: guest.userId,
        username: guest.username,
      });

      setIsWelcomeModalOpen(true);
      return;
    }

    alert("로그인이 필요한 페이지입니다.");

    navigate("/");
  }, []);

  return (
    <>
      {isWelcomeModalOpen && (
        <SimpleModal>
          <Welcome handleClick={closeWelcomeModal} />
        </SimpleModal>
      )}
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
  height: calc(100vh - 90px);
  overflow-y: auto;
  margin-top: 80px;
`;

const Content = styled.main`
  border-top: 2px solid #d9d9d9;
  flex-grow: 1;
  padding: 20px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  max-width: 1100px;
  transition: margin-left 0.3s ease;
`;

export default Layout;
