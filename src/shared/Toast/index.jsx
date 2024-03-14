import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import CONSTANTS from '../../constants/constants';

function ToastPopup({ message, setToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ status: false, message: '' });
    }, CONSTANTS.TOAST_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return <Toast>{message}</Toast>;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Toast = styled.div`
  position: fixed;
  z-index: 2;
  top: 87%;
  left: 0;
  right: 0;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 70px;
  border-radius: 20px;

  animation: ${fadeInUp} 0.5s ease-in-out;

  opacity: 0.8;
  background-color: #000000;
  color: #ffffff;
  font-family: "Noto Sans KR";
  font-size: 1.125rem;
  text-align: center;
  font-weight: 700;
`;

export default ToastPopup;
