import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import Modal from '../../shared/Modal';
import PlanForm from '../PlanForm';
import Plan from '../PlanContent';

import useCalendarStore from '../../store/calender';
import usePlanStore from '../../store/plans';

function Plans() {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planList, setPlanList] = useState([]);

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
      <h2>Daily Plans</h2>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition} darkBackground>
          <PlanForm onSubmit={(e) => submitPlanForm(e)} onClose={handleCloseModal} />
        </Modal>
      )}
      {planList.length > 0 && (
        <PlansList>
          {planList.map((plan) => (
            <Plan key={uuidV4()} plan={plan} />
          ))}
        </PlansList>
      )}
    </PlansContainer>
  );
}

const PlansContainer = styled.div`
  margin: 40px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
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

const PlansList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 600px;
  overflow-y: scroll;
`;

export default Plans;
