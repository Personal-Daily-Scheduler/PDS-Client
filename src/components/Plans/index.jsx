import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '../../shared/Modal';
import PlanForm from '../PlanForm';
import Plan from '../PlanContent';

import useCalendarStore from '../../store/calender';
import usePlanStore from '../../store/plans';

function Plans() {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [separatorIndex, setSeparatorIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planList, setPlanList] = useState([]);

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const { selectedDate } = useCalendarStore();
  const { planByDates } = usePlanStore();

  const getPlanContents = () => {
    const eventList = [];
    const dailyEvents = planByDates[selectedDate];

    if (dailyEvents) {
      for (const planUid in dailyEvents) {
        eventList.push(dailyEvents[planUid]);
      }
    }

    return eventList;
  };

  useEffect(() => {
    if (selectedDate && planByDates[selectedDate]) {
      const dailyPlanList = getPlanContents();

      setPlanList([...dailyPlanList]);

      return;
    }

    if (selectedDate && !planByDates[selectedDate]) {
      setPlanList([]);
    }
  }, [selectedDate, planByDates]);

  const handleOpenModal = (e) => {
    e.preventDefault();

    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setSeparatorIndex(null);
  };

  const handlePlanClick = (e, plan) => {
    e.preventDefault();

    setModalPosition({ left: e.clientX, top: e.clientY });
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;

    const planListCopy = [...planList];
    const draggingItemContent = planListCopy[draggingItem.current];

    planListCopy.splice(draggingItem.current, 1);
    planListCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setPlanList(planListCopy);
  };

  const handleSeparatorClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    setModalPosition({ left: e.clientX, top: e.clientY });
    setSeparatorIndex(index);
    setIsModalOpen(true);
  };

  return (
    <PlansContainer>
      <h2>Plan</h2>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition} darkBackground>
          {selectedPlan ? (
            <PlanForm plan={selectedPlan} onClose={handleCloseModal} />
          ) : (
            <PlanForm separatorIndex={separatorIndex} onClose={handleCloseModal} />
          )}
        </Modal>
      )}
      {planList.length > 0 && (
        <PlansList>
          {planList.map((plan, index) => (
            <>
              <PlanItem key={plan.planId}>
                <Plan
                  plan={plan}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onClick={handlePlanClick}
                />
              </PlanItem>
              {index < planList.length - 1 && (
                <PlanItemSeparator
                  onClick={(e) => handleSeparatorClick(e, index + 1)}
                />
              )}
            </>
          ))}
        </PlansList>
      )}
    </PlansContainer>
  );
}

const PlansContainer = styled.div`
  min-width: 240px;
  margin: 20px;
  border: none;
  border-radius: 8px;
  width: 280px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const AddButton = styled.button`
  background-color: #3b5998;
  color: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4373;
  }
`;

const PlansList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 560px;
  overflow-y: auto;
  width: 100%;
`;

const PlanItem = styled.li`
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &.dragging {
    opacity: 0.8;
    background-color: #e8e8e8;
    transform: scale(0.98);
  }

  &.dragover {
    border: 2px dashed #3b5998;
    background-color: #f0f0f0;
  }
`;

const PlanItemSeparator = styled.div`
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &::before {
    content: '';
    width: 90%;
    height: 2px;
    background-color: #e0e0e0;
    transition: background-color 0.2s ease-in-out;
  }

  &:hover {
    background-color: #f5f5f5;

    &::before {
      background-color: #01fb58;
    }
  }
`;

export default Plans;
