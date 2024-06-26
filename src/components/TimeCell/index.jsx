import React from "react";
import styled from "styled-components";

import changeColor from "../../utils/changeColor";
import formatHour from "../../utils/formatHour";
import useMobileStore from "../../store/useMobileStore";

function TimeCell({
  id, onDragEnd, isDragging, onMouseDown, onMouseEnter, schedule, hour, viewMode,
}) {
  const { isMobile } = useMobileStore();

  const handleMouseup = (e) => {
    onDragEnd(id, e);
  };

  return (
    hour === 0 || hour ? (
      <HoursCell hour={hour} isMobile={isMobile} viewMode={viewMode}>{formatHour(hour)}</HoursCell>
    ) : (
      <TimeCellWrapper
        onPointerDown={onMouseDown}
        onPointerUp={handleMouseup}
        onPointerEnter={() => onMouseEnter(id)}
        isDragging={isDragging}
        schedule={schedule}
        viewMode={viewMode}
        isMobile={isMobile}
      >
        {schedule.startTime === id.time && (
          <ScheduleTitle schedule={schedule}>{schedule.title}</ScheduleTitle>
        )}
      </TimeCellWrapper>
    )
  );
}

const HoursCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ viewMode, isMobile }) => (isMobile ? viewMode === "home" ? "35px" : "45px" : "35px")};
  height: calc(100% / 24);
  font-size: 12px;
  color: black;
  background-color: ${({ hour }) => (parseInt(hour, 10) < 12 ? "#fad3d3" : "#d8e0f9")};
  border: #ebecef 1px solid;
  margin: 0;

  @media (max-width: 980px) and (min-width: 748px) {
    width: 30px;
    height: 22px;
  }

  &:hover {
    background-color: ${({ hour }) => (parseInt(hour, 10) < 12 ? changeColor("#fad3d3", 5) : changeColor("#d8e0f9", 5))};
  }
`;

const TimeCellWrapper = styled.div`
  width: ${({ viewMode, isMobile }) => (isMobile ? viewMode === "home" ? "23px" : "32px" : "35px")};
  height: calc(100% / 26);
  margin: 0;
  border: 0.5px solid ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 15) : changeColor("#f0f1f4", 10) : schedule ? changeColor(schedule.colorCode, 10) : changeColor("#f0f1f4", 10)
  )};
  background-color: ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 10) : "#f0f1f4" : schedule ? schedule.completed ? changeColor(schedule.colorCode, 50, true) : schedule.colorCode : "#ffffff"
  )};
  overflow: visible;

  &:hover {
    background-color: ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 10) : "#928f8f" : schedule ? changeColor(schedule.colorCode, 10, true) : "#f0f1f4"
  )};
  }

  @media (max-width: 980px) and (min-width: 748px) {
    width: 36px;
  }
`;

const ScheduleTitle = styled.div`
  white-space: nowrap;
  font-size: 14px;
  margin-left: 5px;
  border-radius: 4px;
  display: flex;
  color: ${({ schedule }) => (schedule.completed ? "#898989" : "#000000")};
  text-decoration: ${({ schedule }) => (schedule && schedule.completed ? "line-through" : "none")};
  align-items: center;
  position: relative;
`;

export default TimeCell;
