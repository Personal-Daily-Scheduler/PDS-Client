import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';
import createTimeSlots from '../../utils/createTimeSlots';
import sliceTimeSlots from '../../utils/sliceTimeSlots';
import openedIcon from '../../assets/opened_icon.png';
import closedIcon from '../../assets/closed_icon.png';

function TimeComponent() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isClickedStartTime, setIsClickedStartTime] = useState(false);
  const [isClickedEndTime, setIsClickedEndTime] = useState(false);

  const timeSlots = createTimeSlots();
  const timeGroups = sliceTimeSlots(timeSlots, 4);

  const handleTimeSlotClick = (e, type) => {
    e.preventDefault();

    const selectedTime = e.target.textContent;

    if (type === 'startTime') {
      if (endTime) {
        if (endTime < selectedTime) {
          setStartTime(selectedTime);
          setEndTime('');
        }
      }

      setStartTime(selectedTime);
    }
    if (type === 'endTime') {
      if (startTime) {
        if (startTime > selectedTime) {
          setEndTime(selectedTime);
          setStartTime('');
        }
      }

      setEndTime(selectedTime);
    }
  };

  const handleTimeSelectButton = (e, type) => {
    e.preventDefault();

    if (type === 'startTime') {
      setIsClickedStartTime(!isClickedStartTime);
      setIsClickedEndTime(false);
    }

    if (type === 'endTime') {
      setIsClickedEndTime(!isClickedEndTime);
      setIsClickedStartTime(false);
    }
  };

  return (
    <TimeWrapper>
      <TimeSelectRow>
        {isClickedStartTime ? (
          <TimeSelect className="opened" onClick={(e) => handleTimeSelectButton(e, 'startTime')}>
            {startTime}
            <img
              src={openedIcon}
              alt="Button Icon"
              width="20px"
              height="20px"
            />
          </TimeSelect>
        ) : (
          <TimeSelect className="closed" onClick={(e) => handleTimeSelectButton(e, 'startTime')}>
            {startTime}
            <img
              src={closedIcon}
              alt="Button Icon"
              width="20px"
              height="20px"
            />
          </TimeSelect>
        )}
        <TimeSelectDivider>-</TimeSelectDivider>
        {isClickedEndTime ? (
          <TimeSelect className="opened" onClick={(e) => handleTimeSelectButton(e, 'endTime')}>
            {endTime}
            <img
              src={openedIcon}
              alt="Button Icon"
              width="20px"
              height="20px"
            />
          </TimeSelect>
        ) : (
          <TimeSelect className="closed" onClick={(e) => handleTimeSelectButton(e, 'endTime')}>
            {endTime}
            <img
              src={closedIcon}
              alt="Button Icon"
              width="20px"
              height="20px"
            />
          </TimeSelect>
        )}
      </TimeSelectRow>
      {isClickedStartTime && (
        <TimeSlotColumn>
          {timeGroups.map((group) => {
            const randomTimeWrapperKey = uuidV4();

            return (
              <TimeSlotRow key={randomTimeWrapperKey}>
                {group.map((time) => {
                  const randomTimeKey = uuidV4();

                  return (
                    <TimeButton key={randomTimeKey} onClick={(e) => handleTimeSlotClick(e, 'startTime')}>
                      {time}
                    </TimeButton>
                  );
                })}
              </TimeSlotRow>
            );
          })}
        </TimeSlotColumn>
      )}
      {isClickedEndTime && (
        <TimeSlotColumn>
          {timeGroups.map((group) => {
            const randomTimeWrapperKey = uuidV4();

            return (
              <TimeSlotRow key={randomTimeWrapperKey}>
                {group.map((time) => {
                  const randomTimeKey = uuidV4();

                  return (
                    <TimeButton key={randomTimeKey} onClick={(e) => handleTimeSlotClick(e, 'endTime')}>
                      {time}
                    </TimeButton>
                  );
                })}
              </TimeSlotRow>
            );
          })}
        </TimeSlotColumn>
      )}
    </TimeWrapper>
  );
}

const TimeWrapper = styled.div`
  margin-bottom: 10px;
`;
const TimeSelectDivider = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const TimeSelectRow = styled.div`
  display: flex;
  align-items: center;
  width: 235px;
  height: 32px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 8px;
  border: #d9d9d9 solid 1px;
  justify-content: space-between;
  flex-direction: row;
`;
const TimeSelect = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  box-sizing: 'border-box';
  background-color: #E9F1EF;
  color: #268AEF;
  border-radius: 8px;
  letter-spacing:5px;
  font-weight: 700;
  width: 95px;
  height: 22px;
  border: none;
  cursor: pointer;
  padding: 5px;

  .opened {
    border: #268AEF 1px solid;
    box-shadow: 0px 0px 5px #444;
  }

  .closed {
    border: none;
  }
`;

const TimeButton = styled.button`
  background-color: #E9F1EF;
  color: #268AEF;
  border-radius: 8px;
  padding: 5px;
  font-size: 10px;
  font-weight: 700;
  border: none;
  width: 53px;
  height: 20px;
  cursor: pointer;

  &:hover {
    background-color: #268AEF;
    color: white;
    box-shadow: 0px 0px 5px #444;
  }
`;

const TimeSlotRow = styled.div`
  display: flex;
  width: 230px;
  padding:2px 5px;
  justify-content: space-between;
  flex-direction: row;
`;
const TimeSlotColumn = styled.div`
  display: flex;
  height: 80px;
  overflow-y: auto;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius:10px;
  border: #E9F1EF solid 0.5px;
`;
export default TimeComponent;
