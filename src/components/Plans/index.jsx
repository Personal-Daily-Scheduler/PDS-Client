import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../../shared/Modal';
import CreatePlanForm from '../PlanForm';

function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [planTitle, setPlanTitle] = useState('');

  const handleOpenModal = (e) => {
    setModalPosition({ left: e.clientX, top: e.clientY });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddPlan = (planText) => {
    setPlans([...plans, planText]);
    handleCloseModal();
  };

  return (
    <PlansContainer>
      <h2>Daily Plans</h2>

      <AddButton onClick={handleOpenModal}>+</AddButton>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={modalPosition}>
          <h3>Add a Plan</h3>
          <CreatePlanForm onSubmit={(e) => {
            e.preventDefault();
            handleAddPlan(planTitle);
          }}
          />
        </Modal>
      )}

      {plans.length > 0 && (
        <PlansList>
          {plans.map((plan, index) => {
            const randomKey = uuidv4();

            return (
              <PlanItem key={randomKey}>{plan}</PlanItem>
            );
          })}
        </PlansList>
      )}
    </PlansContainer>
  );
}

const PlansContainer = styled.div`
  margin: 40px;
  border: 2px solid #ccc;
  border-radius: 10px;
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
`;

const PlanItem = styled.li`
  margin-bottom: 5px;
`;

export default Plans;
