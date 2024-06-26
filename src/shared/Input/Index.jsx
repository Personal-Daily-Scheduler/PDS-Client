import React from "react";
import styled from "styled-components";

function Input({
  label, type, placeholder, description, value, onChange, size, onEnterDown,
}) {
  const handleKeyDown = (e) => {
    if (onEnterDown && e.key === "Enter") {
      onEnterDown(e);
    }
  };

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        onKeyDown={handleKeyDown}
      />
      {description && <InputDescription>{description}</InputDescription>}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  display: flex;
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const StyledInput = styled.input`
  width: ${({ size }) => (size && size.width ? size.width : "400px")};
  height: ${({ size }) => (size && size.height ? size.height : "48px")};
  padding: 5px 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const InputDescription = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

export default Input;
