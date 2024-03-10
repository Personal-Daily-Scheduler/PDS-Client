import React from 'react';
import styled from 'styled-components';

const Input = ({ label, type, placeholder, description }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <StyledInput type={type} placeholder={placeholder} />
      {description && <InputDescription>{description}</InputDescription>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 48px;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const InputDescription = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

export default Input;
