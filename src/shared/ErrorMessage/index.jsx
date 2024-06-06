import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

function ErrorMessage({ content, setMessage }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({ message: "", visible: false });
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <ErrorMessageWrapper>{content}</ErrorMessageWrapper>;
}

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ErrorMessageWrapper = styled.div`
  color: red;
  text-align: center;
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 10px;
  animation: ${fadeInOut} 0.5ms ease-in-out;
`;

export default ErrorMessage;
