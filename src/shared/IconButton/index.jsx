import React from "react";
import styled from "styled-components";

function IconTextButton({
  iconSrc, text, onClick, size,
}) {
  return (
    <Button onClick={onClick}>
      <Icon src={iconSrc} alt="Icon" iconSize={size} />
      { text && <ButtonText>{text}</ButtonText>}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  background:none;
  color: black;
  border: 1px solid white;
  border-radius: 5px;
  padding: 2px;
  margin-right: 3px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    border: 1px solid black;
    color: black;
  }
`;

const Icon = styled.img`
  width: ${(props) => (props.iconSize || "13px")};
  height: ${(props) => (props.iconSize || "13px")};
`;

const ButtonText = styled.span`
  margin-left: 5px;
  font-size: 16px;
`;

export default IconTextButton;
