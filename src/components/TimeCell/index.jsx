import React from 'react';
import styled from 'styled-components';

function TimeCell({
  id, onDragEnd, isDragging, onMouseDown, onMouseEnter, schedule, hour,
}) {
  return hour === 0 || hour ? (
    <HourCell>{hour}</HourCell>
  ) : (
    <CellWrapper
      onMouseDown={onMouseDown}
      onMouseUp={() => onDragEnd(id)}
      onMouseEnter={() => onMouseEnter(id)}
      isDragging={isDragging}
      schedule={schedule}
    />
  );
}

const HourCell = styled.div`
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

const CellWrapper = styled.div`
  width: 35px;
  height: 22px;
  margin: 0;
  border: ${({ isDragging }) => (isDragging ? 'white' : '#d9d9d9')} 1px solid;
  background-color: ${(props) => (
    props.isDragging ? '#ffcc00' : props.schedule ? props.schedule.colorCode : '#10f2aa'
  )};

  &:hover {
    background-color: ${(props) => (
    props.isDragging ? '#928f8f' : props.schedule ? 'red' : '#fffffff1'
  )}
  };
`;

export default TimeCell;
