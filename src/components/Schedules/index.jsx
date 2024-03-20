import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../shared/Modal';
import ScheduleForm from '../ScheduleForm';
import TimeCells from '../TimeCells';

import useScheduleStore from '../../store/schedules';

function Schedules() {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setSchedule } = useScheduleStore();

  const handleOpenModal = (e) => {
    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitScheduleForm = (newSchedule) => {
    setSchedule(newSchedule);

    handleCloseModal();
  };

  return (
    <SchedulesContainer>
      <h2>Do</h2>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition}>
          <h3>Add New Task</h3>
          <ScheduleForm onSubmit={(e) => submitScheduleForm(e)} />
        </Modal>
      )}
      <TimeCells></TimeCells>
    </SchedulesContainer>
  );
}

const SchedulesContainer = styled.div`
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
