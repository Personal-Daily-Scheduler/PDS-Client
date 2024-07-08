import React from "react";
import styled from "styled-components";

function CommonButton({
  children, width, height, onClick, color,
}) {
  return (
    <StyledButton width={width} height={height} onClick={onClick} color={color}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "48px"};
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.color || "#1877f2"};
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export default CommonButton;
