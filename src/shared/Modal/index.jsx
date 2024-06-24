import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import closeButtonHover from "../../assets/close_button_hover.png";
import closeButtonDefault from "../../assets/close_button.png";

function Modal({
  onClose, children, style, darkBackground, borderRadius,
}) {
  const [position, setPosition] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    if (style) {
      const { left, top } = style;
      const { offsetHeight } = modalRef.current;

      const viewportHeight = window.innerHeight;

      if (style.top + offsetHeight > viewportHeight) {
        const newTop = Math.max(viewportHeight - offsetHeight - 20, 0);

        setPosition({
          left,
          top: newTop,
        });
      } else {
        setPosition({
          left,
          top,
        });
      }
    } else {
      setPosition({
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      });
    }
  }, [style, children]);

  const onClickModalOverlay = (e) => {
    const isClickedInX = () => position.left <= e.clientX && e.clientX <= position.left + modalRef.current.offsetWidth;
    const isClickedInY = () => position.top <= e.clientY && e.clientY <= position.top + modalRef.current.offsetHeight;

    if (!(isClickedInX() && isClickedInY())) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClickModalOverlay} darkBackground={darkBackground}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        style={position}
        borderRadius={borderRadius}
      >
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
  background-color: ${(props) => (props.darkBackground ? "rgba(0, 0, 0, 0.5)" : "transparent")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: ${(props) => (props.borderRadius || "5px")};
  position: absolute;
  ${({ style }) => style && `left: ${style.left}px; top: ${style.top}px;`}
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
