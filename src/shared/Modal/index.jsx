import React from 'react';
import styled from 'styled-components';

import closeButtonHover from '../../assets/close_button_hover.png';
import closeButtonDefault from '../../assets/close_button.png';

function Modal({ onClose, children, style }) {
  return (
    <ModalOverlay>
      <ModalContent style={style}>
        {children}
        <CloseButton onClick={onClose}></CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  background-image: url(${closeButtonDefault});
  background-size: contain;
  width: 15px;
  height: 15px;
  border: none;
  transition: background-image 0.2s;

  &:hover {
    background-image: url(${closeButtonHover}) 
  }
`;

export default Modal;
