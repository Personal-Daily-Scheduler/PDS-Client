import React from 'react';
import styled from 'styled-components';

function IconTextButton({ iconSrc, text, onClick }) {
  return (
    <Button onClick={onClick}>
      <Icon src={iconSrc} alt="Icon" />
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: white;
  color: black;
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    border: 1px solid black;
    color: black;
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const ButtonText = styled.span`
  font-size: 16px;
`;

export default IconTextButton;
