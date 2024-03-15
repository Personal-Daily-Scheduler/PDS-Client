import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from '../../shared/Modal';
import ScheduleForm from '../ScheduleForm';
import TimeCells from '../TimeCells';

import useCalendarStore from '../../store/calender';
import usePlanStore from '../../store/plans';

function Schedules() {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planList, setPlanList] = useState([]);

  const { selectedDate } = useCalendarStore();
  const { byDates } = usePlanStore();

  const getPlanContents = () => {
    const eventList = [];
    const dailyEvents = byDates[selectedDate];

    if (dailyEvents) {
      for (const planUid in dailyEvents) {
        eventList.push(dailyEvents[planUid]);
      }
    }

    return eventList;
  };

  useEffect(() => {
    if (selectedDate && byDates[selectedDate]) {
      const dailyPlanList = getPlanContents();

      setPlanList([...dailyPlanList]);

      return;
    }

    if (selectedDate && !byDates[selectedDate]) {
      setPlanList([]);
    }
  }, [selectedDate, byDates]);

  const handleOpenModal = (e) => {
    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitPlanForm = (planContent) => {
    setPlanList([...planList, planContent]);

    handleCloseModal();
  };

  return (
    <PlansContainer>
      <h2>Daily Do</h2>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition}>
          <h3>Add New Task</h3>
          <ScheduleForm onSubmit={(e) => submitPlanForm(e)} />
        </Modal>
      )}
      <TimeCells></TimeCells>
    </PlansContainer>
  );
}

const PlansContainer = styled.div`
  margin: 40px 0px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const AddButton = styled.button`
  background-color: #3b5998;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default Schedules;
