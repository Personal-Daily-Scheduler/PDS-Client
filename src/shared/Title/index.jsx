import React from "react";
import styled from "styled-components";

function CommonTitle({ mainTitle, subTitle, size = "medium" }) {
  return (
    <TitleContainer>
      <MainTitle size={size}>{mainTitle}</MainTitle>
      <SubTitle size={size}>{subTitle}</SubTitle>
    </TitleContainer>
  );
}

const sizes = {
  large: {
    mainTitle: "32px",
    subTitle: "25px",
  },
  medium: {
    mainTitle: "28px",
    subTitle: "20px",
  },
  small: {
    mainTitle: "24px",
    subTitle: "16px",
  },
};

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: ${(props) => sizes[props.size].mainTitle};
  color: black;
  margin-bottom: 10px;
`;

const SubTitle = styled.span`
  font-size: ${(props) => sizes[props.size].subTitle};
  line-height: 26px;
  color: #888;
  white-space: pre-line;
`;

export default CommonTitle;
