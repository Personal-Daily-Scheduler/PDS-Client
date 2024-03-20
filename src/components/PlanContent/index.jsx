import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../shared/Modal';
import PlanForm from '../PlanForm';

import checkedIcon from '../../assets/checked_icon.png';
import fetchRemovePlan from '../../services/plan/fetchRemovePlan';
import fetchUpdatePlan from '../../services/plan/fetchUpdatePlan';
import fetchEditSchedule from '../../services/schedule/fetchEditSchedules';

import usePlanStore from '../../store/plans';
import useCalendarStore from '../../store/calender';
import useScheduleStore from '../../store/schedules';

function Plan({ plan }) {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedDate } = useCalendarStore();
  const { deletePlan, setCompleted, setPlan } = usePlanStore();
  const { setSchedule } = useScheduleStore();

  const handleClickCompleted = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCompleted(selectedDate, plan.planId);

    const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

    if (memberUser) {
      plan.completed = !plan.completed;
      await fetchUpdatePlan(plan, memberUser);
    }
  };

  const handleClickDeleteButton = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    deletePlan(selectedDate, plan.planId);

    const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

    if (memberUser) {
      await fetchRemovePlan(plan, memberUser);
    }
  };

  const handleClickPlanContent = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickEditButton = async (modifiedPlan) => {
    const {
      planId, startTime, endTime, ...rest
    } = modifiedPlan;

    if ((!startTime && !endTime) || (startTime && endTime)) {
      setPlan(modifiedPlan);

      const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

      if (memberUser) {
        await fetchUpdatePlan(modifiedPlan, memberUser);
      }

      if (startTime !== '' && endTime !== '') {
        const modifiedSchedule = {
          scheduleId: planId, startTime, endTime, ...rest,
        };
        setSchedule(modifiedSchedule);

        if (memberUser) {
          await fetchEditSchedule(modifiedSchedule, memberUser);
        }
      }
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition} darkBackground>
          <PlanForm onSubmit={handleClickEditButton} plan={plan} onClose={handleCloseModal} />
        </Modal>
      )}
      <PlanItemWrapper color={plan.colorCode} onClick={handleClickPlanContent}>
        <CompleteButton
          completed={plan.completed}
          onClick={handleClickCompleted}
        >
        </CompleteButton>
        <PlanItem>
          {plan.startTime && (
            <Time>
              {plan.startTime}
              {' '}
              ~
              {plan.endTime}
            </Time>
          )}
          <Title>
            {plan.title}
          </Title>
          <div>
            {plan.description}
          </div>
        </PlanItem>
        <DeleteButton onClick={handleClickDeleteButton}>
          삭제
        </DeleteButton>
      </PlanItemWrapper>
    </>
  );
}

const CompleteButton = styled.button`
  height:25px;
  width:25px;
  padding: 2px;
  background-image: ${(props) => (props.completed ? `url(${checkedIcon})` : 'none')};
  background-repeat: no-repeat;
  background-size: contain;
  background-color:  ${(props) => (props.completed ? '#0A7EED' : 'white')};
  border: ${(props) => (props.completed ? 'none' : '#7A7A7A 1px solid')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:  ${(props) => (props.completed ? '#0803F9' : '#7A7A7A')};
    border: none;
  }
`;

const PlanItem = styled.div`
  margin-left: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PlanItemWrapper = styled.li`
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  border-left: 5px solid ${(props) => props.color};
  padding: 10px;
  margin-bottom: 5px;
  align-items: center;

  &:hover {
    background-color: #e0e0e0
  };
`;

const Time = styled.div`
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export default Plan;
