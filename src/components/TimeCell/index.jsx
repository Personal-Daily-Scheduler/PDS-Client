import React from 'react';
import styled from 'styled-components';

import darkenColor from '../../utils/darkenColor';

function TimeCell({
  id, onDragEnd, isDragging, onMouseDown, onMouseEnter, schedule, hour,
}) {
  const handleMouseup = (e) => {
    onDragEnd(id, e);
  };

  return (
    hour === 0 || hour ? (
      <HoursCell>{hour}</HoursCell>
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
  width: 35px;
  height: 22px;
  color: black;
  background-color: #55ff00;
  border: black 1px solid;
  margin: 0;

  &:hover {
    background-color: #2e8304
  }
`;

const TimeCellWrapper = styled.div`
  width: 35px;
  height: 22px;
  margin: 0;
  border: 1px solid ${({ isDragging, schedule }) => (
    isDragging ? darkenColor('#ffcc00', 10) : schedule ? darkenColor(schedule.colorCode, 10) : '#d9d9d9'
  )};
  background-color: ${({ isDragging, schedule }) => (
    isDragging ? '#ffcc00' : schedule ? schedule.colorCode : '#10f2aa'
  )};
  overflow: visible;

  &:hover {
    background-color: ${({ isDragging, schedule }) => (isDragging ? '#928f8f' : schedule ? 'red' : '#fffffff1')}
  };
`;

export default TimeCell;
