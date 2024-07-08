import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";

import CommonButton from "../../shared/Button";

import webTutorialImage1 from "../../assets/browser_tutorial_image1.png";
import webTutorialImage2 from "../../assets/browser_tutorial_image2.png";
import webTutorialImage3 from "../../assets/browser_tutorial_image3.png";
import mobileTutorialImage1 from "../../assets/mobile_tutorial_image1.png";
import mobileTutorialImage2 from "../../assets/mobile_tutorial_image2.png";
import mobileTutorialImage3 from "../../assets/mobile_tutorial_image3.png";
import pdsLogo from "../../assets/tutorial_logo.png";

import useMobileStore from "../../store/useMobileStore";

function TutorialSwiper({ onClickStartButton }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isMobile } = useMobileStore();

  const tutorialContent = [
    {
      number: "",
      title: "PDS 다이어리",
      description: "Create by. Kyeong jun \n Github : kyeongjun-ko",
      webImage: pdsLogo,
      mobileImage: pdsLogo,
    },
    {
      number: "01",
      title: "PLAN - 계획하기",
      description: "오늘 하루동안 해야할 일을 \nTo Do List 형식으로 관리해보세요",
      webImage: webTutorialImage1,
      mobileImage: mobileTutorialImage1,
    },
    {
      number: "02",
      title: "DO - 실행하기",
      description: "10분 단위로 나누어진 셀을 \n드래그해서 일정을 추가해보세요",
      webImage: webTutorialImage2,
      mobileImage: mobileTutorialImage2,
    },
    {
      number: "03",
      title: "SEE - 회고하기",
      description: "오늘 하루동안 회고하면서 \n간단한 글을 작성해보세요.",
      webImage: webTutorialImage3,
      mobileImage: mobileTutorialImage3,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? tutorialContent.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === tutorialContent.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <TutorialWrapper>
      <TutorialHeader>
        {currentIndex !== 0
          && <TutorialNumber>{tutorialContent[currentIndex].number}</TutorialNumber>}
        <TutorialTitle>{tutorialContent[currentIndex].title}</TutorialTitle>
      </TutorialHeader>
      <TutorialImage
        src={isMobile ? tutorialContent[currentIndex].mobileImage : tutorialContent[currentIndex].webImage}
        alt="Tutorial Image"
      />
      <TutorialDescription>{tutorialContent[currentIndex].description}</TutorialDescription>
      <TutorialFooter>
        <SwipeIconContainer>
          {tutorialContent.map((_, index) => (
            <SwipeIcon key={uuidV4()} active={index === currentIndex} />
          ))}
        </SwipeIconContainer>
        <ButtonContainer>
          <>
            {currentIndex !== 0
              && <CommonButton width="100px" height="40px" color="#A7A7A8" onClick={handlePrev}>이전</CommonButton>}
            {currentIndex === tutorialContent.length - 1 ? (
              isMobile && <CommonButton width="100px" height="40px" color="#489FF2" onClick={onClickStartButton}>시작하기</CommonButton>
            ) : (
              <CommonButton width="100px" height="40px" color="#489FF2" onClick={handleNext}>다음</CommonButton>
            )}
          </>
        </ButtonContainer>
      </TutorialFooter>
    </TutorialWrapper>
  );
}

const TutorialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80%;
  width: 80%; /* Adjust the width as needed */
  background-color: #0A7EED;
  border-radius: 20px;
`;

const TutorialHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  text-content: center;
  justify-content: center;
  align-items: center;
`;

const TutorialNumber = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const TutorialTitle = styled.span`
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  margin: 10px auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const TutorialDescription = styled.span`
  margin-top: 10px;
  height: 10%;
  text-align: center;
  align-content: center;
  color: #fff;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  white-space: pre-wrap;
`;

const TutorialImage = styled.img`
  display:flex;
  width: 70%;
  height:50%;
  object-fit: contain;
`;

const SwipeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const TutorialFooter = styled.div`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const SwipeIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#3f51b5" : "#ccc")};
  margin: 0 5px;
  transition: all 0.3s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export default TutorialSwiper;
