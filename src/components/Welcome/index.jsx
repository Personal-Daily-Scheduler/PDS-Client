import React from "react";
import styled from "styled-components";

import Description from "../Description";

import diaryIcon from "../../assets/diary_icon.png";

function Welcome({ handleClick }) {
  return (
    <Wrapper>
      <IconImage src={diaryIcon} alt="welcome-modal-icon" />
      <TextWrapper>
        <h1 className="title">환영합니다!</h1>
        <Description
          className="description"
          size="large"
          text="PDS 다이어리에 오신 것을 환영합니다. \n 이곳에서는 일기를 작성하고, 일정을 관리하며, \n 시간을 집약적으로 활용할 수 있습니다. \n 시작해볼까요?"
        />
      </TextWrapper>
      <StyledButton onClick={handleClick}>
        시작하기
      </StyledButton>
    </Wrapper>
  );
}

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #007bff;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const IconImage = styled.img`
  width: 100px;
  height: 100px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding: 20px;
  text-align: center;

  .title {
    margin-bottom: 18px;
    color: #000000;
    font-size: 2rem;
    font-style: normal;
    font-weight: 900;
    line-height: 30px;
  }
`;

export default Welcome;
