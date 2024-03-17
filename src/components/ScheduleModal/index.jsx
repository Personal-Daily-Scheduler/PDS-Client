import React from 'react';
import styled from 'styled-components';

function ScheduleModal({
  onEdit, onDelete, onCreate, onCopy,
}) {
  return (
    <ModalContent>
      {onEdit && <Button onClick={onEdit}>Edit✏️</Button>}
      {onDelete && <Button onClick={onDelete}>Delete❌</Button>}
      {onCreate && <Button onClick={onCreate}>Create📝</Button>}
      {onCopy && <Button onClick={onCopy}>Copy📑</Button>}
    </ModalContent>
  );
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: min-content;
  background-color: white;
  border-radius: 20px;
  border: none;
`;

const Button = styled.button`
  white-space:nowrap;
  font-size: 15px;
  width: 80px;
  height: 30px;
  background: none;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
`;

export default ScheduleModal;
