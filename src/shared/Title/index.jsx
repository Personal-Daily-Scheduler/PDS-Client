import React from 'react';
import styled from 'styled-components';

const CommonTitle = ({ mainTitle, subTitle }) => {
  return (
    <TitleContainer>
      <MainTitle>{mainTitle}</MainTitle>
      <SubTitle>{subTitle}</SubTitle>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #888;
`;

export default CommonTitle;
