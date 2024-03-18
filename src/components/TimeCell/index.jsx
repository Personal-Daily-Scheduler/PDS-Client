import React from 'react';
import styled from 'styled-components';

import changeColor from '../../utils/changeColor';
import formatHour from '../../utils/formatHour';

function TimeCell({
  id, onDragEnd, isDragging, onMouseDown, onMouseEnter, schedule, hour,
}) {
  const handleMouseup = (e) => {
    onDragEnd(id, e);
  };

  return (
    hour === 0 || hour ? (
      <HoursCell hour={hour}>{formatHour(hour)}</HoursCell>
    ) : (
      <TimeCellWrapper
        onMouseDown={onMouseDown}
        onMouseUp={handleMouseup}
        onMouseEnter={() => onMouseEnter(id)}
        isDragging={isDragging}
        schedule={schedule}
      >
        {(schedule.startTime === id.time) && schedule.title}
      </TimeCellWrapper>
    )
  );
}

const HoursCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 22px;
  font-size: 12px;
  color: black;
  background-color: ${({ hour }) => (parseInt(hour, 10) < 12 ? '#fad3d3' : '#d8e0f9')};
  border: #ebecef 1px solid;
  margin: 0;

  &:hover {
    background-color: ${({ hour }) => (parseInt(hour, 10) < 12 ? changeColor('#fad3d3', 5) : changeColor('#d8e0f9', 5))};
  }
`;

const TimeCellWrapper = styled.div`
  width: 35px;
  height: 22px;
  margin: 0;
  border: 0.5px solid ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 15) : changeColor('#f0f1f4', 10) : schedule ? changeColor(schedule.colorCode, 10) : changeColor('#f0f1f4', 10)
  )};
  background-color: ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 10) : '#f0f1f4' : schedule ? schedule.colorCode : '#ffffff'
  )};
  overflow: visible;

  &:hover {
    background-color: ${({ isDragging, schedule }) => (
    isDragging ? schedule ? changeColor(schedule.colorCode, 10) : '#928f8f' : schedule ? changeColor(schedule.colorCode, 10, true) : '#f0f1f4'
  )};
  }
`;

export default TimeCell;
