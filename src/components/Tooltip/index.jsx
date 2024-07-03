import React from "react";
import styled from "styled-components";

import IconTextButton from "../../shared/IconButton";

import questionMark from "../../assets/question_icon.png";

function Tooltip({ message }) {
  return (
    <TooltipWrapper data-tooltip={message}>
      <IconTextButton iconSrc={questionMark} />
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    min-width: 200px;
    max-width: 300px;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 500;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out;
    white-space: break-spaces;
  }
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

export default Tooltip;
