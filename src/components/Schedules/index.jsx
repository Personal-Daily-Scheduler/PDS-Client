import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Modal from "../../shared/Modal";
import ScheduleForm from "../ScheduleForm";
import TimeCells from "../TimeCells";

import useMobileStore from "../../store/useMobileStore";
import Tooltip from "../Tooltip";

function Schedules({ viewMode }) {
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const containerRef = useRef(null);

  const { isMobile } = useMobileStore();

  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateContainerHeight();

    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

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
    <SchedulesContainer ref={containerRef} isMobile={isMobile} viewMode={viewMode}>
      <SchedulesHeader>
        <Title>Do</Title>
        <Tooltip message="10분 단위로 일정을 추가할 수 있어요" />
      </SchedulesHeader>
      <AddButton onClick={handleOpenModal}>+</AddButton>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={isMobile ? undefined : modalPosition}>
          <ScheduleForm onSubmit={submitScheduleForm} />
        </Modal>
      )}
      <TimeCells containerHeight={containerHeight}></TimeCells>
    </SchedulesContainer>
  );
}

const SchedulesContainer = styled.div`
  display: flex;
  border: none;
  border-radius: 8px;
  width: ${({ viewMode, isMobile }) => (isMobile ? viewMode === "home" ? "50%" : "300px" : "33%")};
  height: ${({ viewMode, isMobile }) => (isMobile ? viewMode === "home" ? "calc((100vh - 120px) * 0.6)" : "calc(100vh - 150px)" : "calc(100vh - 120px)")};
  min-width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 980px) and (min-width: 748px) {
    height: calc(100vh - 320px);
  }
`;

const SchedulesHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px auto;
`;

const AddButton = styled.button`
  background-color: #3b5998;
  color: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4373;
  }
`;

export default Schedules;
