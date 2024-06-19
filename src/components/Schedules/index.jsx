import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../../shared/Modal";
import ScheduleForm from "../ScheduleForm";
import TimeCells from "../TimeCells";

function Schedules() {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitScheduleForm = () => {
    handleCloseModal();
  };

  return (
    <SchedulesContainer>
      <Title>Do</Title>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition}>
          <ScheduleForm onSubmit={submitScheduleForm} />
        </Modal>
      )}
      <TimeCells></TimeCells>
    </SchedulesContainer>
  );
}

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px auto;
`;

const SchedulesContainer = styled.div`
  display: flex;
  margin: 10px 5px;
  border: none;
  border-radius: 8px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

export default Schedules;
