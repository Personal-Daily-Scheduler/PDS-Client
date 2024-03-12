import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  ${({ style }) => style && `left: ${style.left}px; top: ${style.top}px;`}
`;

function Modal({ onClose, children, style }) {
  return (
    <ModalOverlay>
      <ModalContent style={style}>
        {children}
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
