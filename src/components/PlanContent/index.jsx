import React, { useState } from "react";
import styled from "styled-components";

import checkedIcon from "../../assets/checked_icon.png";
import dragIndicator from "../../assets/drag_indicator_icon.png";
import syncedIcon from "../../assets/synced_icon.png";
import fetchRemovePlan from "../../services/plan/fetchRemovePlan";
import fetchRemoveSchedule from "../../services/schedule/fetRemoveSchedule";
import fetchEditSchedule from "../../services/schedule/fetchEditSchedules";
import fetchUpdatePlan from "../../services/plan/fetchUpdatePlan";

import usePlanStore from "../../store/plans";
import useCalendarStore from "../../store/calender";
import useScheduleStore from "../../store/schedules";

function Plan({
  plan, index, onClick, onDragStart, onDragEnter,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const { selectedDate } = useCalendarStore();
  const { deletePlan, setCompletedPlan } = usePlanStore();
  const { deleteSchedule, setIsHovered, setCompletedSchedule } = useScheduleStore();

  const handleClickCompleted = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { planId, completed, ...rest } = plan;
    const targetSchedule = { scheduleId: planId, completed, ...rest };

    if (plan.isSynced) {
      setCompletedSchedule(targetSchedule);
      setCompletedPlan(selectedDate, plan.planId);
    } else {
      setCompletedPlan(selectedDate, plan.planId);
    }

    const memberUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));

    const completedPlan = { ...plan, completed: !completed };
    const completedSchedule = { ...targetSchedule, completed: !completed };

    if (memberUser) {
      if (plan.isSynced) {
        await fetchEditSchedule(completedSchedule, memberUser);
        await fetchUpdatePlan(completedPlan, memberUser);
      } else {
        await fetchUpdatePlan(completedPlan, memberUser);
      }
    }
  };

  const handleClickDeleteButton = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { planId, isSynced, ...rest } = plan;

    const targetSchedule = {
      scheduleId: planId,
      isSynced,
      ...rest,
    };

    if (isSynced) {
      deletePlan(selectedDate, planId);
      deleteSchedule(targetSchedule);
    } else {
      deletePlan(selectedDate, planId);
    }

    const memberUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));

    if (memberUser) {
      if (isSynced) {
        await fetchRemovePlan(plan, memberUser);
        await fetchRemoveSchedule(targetSchedule, memberUser);
      } else {
        await fetchRemovePlan(plan, memberUser);
      }
    }
  };

  const handleClickPlanContent = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onClick(e, plan);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, index);
  };

  const handleDragEnter = (e) => {
    setIsDragging(false);
    onDragEnter(e, index);
  };

  const handleMouseOver = (e) => {
    e.preventDefault();

    if (plan.isSynced) {
      setIsHovered(plan, true);
    }
  };

  const handleMouseOut = (e) => {
    e.preventDefault();

    if (plan.isSynced) {
      setIsHovered(plan, false);
    }
  };

  return (
    <PlanItemWrapper
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onMouseEnter={handleMouseOver}
      onMouseOut={handleMouseOut}
      color={plan.colorCode}
      onClick={handleClickPlanContent}
      isDragging={isDragging}
    >
      <DragIndicator isDragging={isDragging} />
      <CompleteButton
        completed={plan.completed}
        onClick={handleClickCompleted}
      >
      </CompleteButton>
      <PlanItem>
        {plan.startTime && (
        <Time>
          {`${plan.startTime} ~ ${plan.endTime}`}
        </Time>
        )}
        <TitleWrapper>
          {plan.isSynced && <SyncedIcon src={syncedIcon} alt="synced_icon" />}
          <Title>{plan.title}</Title>
        </TitleWrapper>
        <Description>
          {plan.description}
        </Description>
      </PlanItem>
      <DeleteButton onClick={handleClickDeleteButton}>
        삭제
      </DeleteButton>
    </PlanItemWrapper>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0px;
`;

const DragIndicator = styled.div`
  position: absolute;
  left: -22px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 30px;
  background-image: url(${dragIndicator});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: move;
  visibility: ${({ isDragging }) => (isDragging ? "visible" : "hidden")};
`;

const PlanItemWrapper = styled.li`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  border-left: 5px solid ${(props) => props.color};
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  align-items: center;
  position: relative;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    ${DragIndicator} {
      visibility: ${({ isDragging }) => (isDragging ? "visible" : "visible")};
    }
  }
`;

const CompleteButton = styled.button`
  height:25px;
  width:25px;
  background-image: ${(props) => (props.completed ? `url(${checkedIcon})` : "none")};
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  background-color: ${(props) => (props.completed ? "#0A7EED" : "white")};
  border: ${(props) => (props.completed ? "none" : "#7A7A7A 1px solid")};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:  ${(props) => (props.completed ? "#0803F9" : "#e0e0e0")};
    border: none;
  }
`;

const SyncedIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const PlanItem = styled.div`
  margin-left: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Time = styled.div`
  font-size: 10px;
  color: #777;
  margin: 4px 0px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 4px 0px;
`;

const DeleteButton = styled.button`
  width: 50px;
  border-radius: 5px;
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

const Description = styled.div`
  font-size: 12px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  line-height: 1.4;
  word-break: break-word;
`;

export default Plan;
