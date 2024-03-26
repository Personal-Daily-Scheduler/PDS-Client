import React from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

function Description({ text, size }) {
  return (
    <DescriptionWrapper size={size}>
      {text.split('\\n').map((line) => (
        <React.Fragment key={uuidV4()}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #000000;
  font-size: ${({ size }) => (size === 'large' ? '1.2rem' : '1rem')};
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export default Description;
