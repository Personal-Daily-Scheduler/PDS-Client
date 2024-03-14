import React from 'react';
import styled from 'styled-components';

import usePlanStore from '../../store/plans';
import useCalendarStore from '../../store/calender';

import fetchRemovePlan from '../../services/fetchRemovePlan';
import checkedIcon from '../../assets/checked_icon.png';

function Plan({ plan }) {
  const { selectedDate } = useCalendarStore();
  const { deletePlan, setCompleted } = usePlanStore();

  const handleClickCompleted = (e) => {
    e.preventDefault();

    setCompleted(selectedDate, plan.planId);
  };

  const handleClickDeleteButton = async (e) => {
    e.preventDefault();

    deletePlan(selectedDate, plan.planId);

    const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

    if (memberUser) {
      await fetchRemovePlan(plan, memberUser);
    }
  };

  return (
    <PlanItemWrapper color={plan.color}>
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
