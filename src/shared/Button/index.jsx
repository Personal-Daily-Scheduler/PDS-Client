import React from 'react';
import styled from 'styled-components';

function CommonButton({
  children, width, height, onClick,
}) {
  return (
    <StyledButton width={width} height={height} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '48px'};
  border: none;
  border-radius: 8px;
  background-color: #1877f2;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export default CommonButton;
