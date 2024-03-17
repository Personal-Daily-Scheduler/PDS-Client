import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import TimeCell from '../TimeCell';

import createTimeSlots from '../../utils/createTimeSlots';
import useClickOutside from '../../utils/useClickOutside';

function TimeCells() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const timeSlots = useRef();

  const handleOutsideClick = () => {
    setSelectedCells([]);
    setStartCell('');
    setEndCell('');
    setIsDragging(false);
  };

  const close = useCallback(() => handleOutsideClick());

  useClickOutside(timeSlots, close);

  const handleDragStart = (id) => {
    setStartCell(id);
    setSelectedCells([id]);
    setIsDragging(true);
  };

  const handleDragEnd = (id) => {
    if (!startCell && startCell !== 0) {
      return;
    }

    const start = Math.min(startCell, id);
    const end = Math.max(startCell, id);

    const cellsInRange = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    setSelectedCells(cellsInRange);
    setIsDragging(false);
    setEndCell(id);
  };

  const handleCellClick = (id) => {
    if (isDragging) {
      handleDragEnd(id);

      return;
    }

    setEndCell(null);
    handleDragStart(id);
  };

  const handleMouseEnter = (timeCell) => {
    if (isDragging) {
      setEndCell(timeCell);
      setSelectedCells((selectedIndexes) => {
        selectedIndexes.sort((a, b) => a - b);

        const startIndex = selectedIndexes[0];
        const endIndex = selectedIndexes[selectedIndexes.length - 1];

        const isNewlySelectedIndex = !selectedIndexes.includes(timeCell.index);

        if (isNewlySelectedIndex) {
          const isForwardSelection = timeCell.index > startIndex && timeCell.index > endIndex;

          if (isForwardSelection) {
            if (startCell > endCell) {
              return Array.from({
                length: timeCell.index - startCell.index + 1,
              }, (_, index) => index + startCell.index);
            }

            return Array.from({
              length: timeCell.index - startIndex + 1,
            }, (_, index) => index + startIndex);
          }

          const isBackwardSelection = timeCell.index < startIndex && timeCell.index < endIndex;

          if (isBackwardSelection) {
            return Array.from({
              length: startCell.index - timeCell.index + 1,
            }, (_, index) => index + timeCell.index);
          }
        }

        const isWithinSelection = startIndex < timeCell.index && endIndex > timeCell.index;

        if (isWithinSelection && timeCell.index < endCell.index) {
          return Array.from({
            length: timeCell.index - startIndex + 1,
          }, (_, index) => index + startIndex);
        }

        if (isWithinSelection && timeCell.index > endCell.index) {
          return Array.from({
            length: endIndex - timeCell.index + 1,
          }, (_, index) => index + timeCell.index);
        }

        return [timeCell.index];
      });
    }
  };

  const timesArray = createTimeSlots();
  const hoursArray = Array.from({ length: 24 }, (_, index) => index);

  return (
    <>
      <div>
        {startCell}
        /
        {endCell}
        /
        {selectedCells}
      </div>
      <Outside onClick={handleOutsideClick}>시간 초기화</Outside>
      <CellContainer>
        <HoursWrapper>
          {hoursArray.map((hour) => (
            <TimeCell key={hour} hour={hour}>{hour}</TimeCell>
          ))}
        </HoursWrapper>
        <TimeWrapper ref={timeSlots}>
          {timesArray.map((time, index) => (
            index < 5 ? (
              <TimeCell
                key={uuidV4()}
                id={index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onMouseEnter={handleMouseEnter}
                onMouseDown={() => handleCellClick(index)}
                isDragging={selectedCells.includes(index)}
                schedule={{
                  time,
                  colorCode: '#0000ff',
                }}
              />
            ) : (
              <TimeCell
                key={uuidV4()}
                id={index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onMouseEnter={handleMouseEnter}
                onMouseDown={() => handleCellClick(index)}
                isDragging={selectedCells.includes(index)}
              />
            )
          ))}
        </TimeWrapper>
      </CellContainer>
    </>
  );
}

const Outside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  width: 230px;
  height: 30px;
  margin-bottom: 10px;
  background-color: #d9d9d9;
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HoursWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`;

const TimeWrapper = styled.div`
  display: flex;
  width: 235px;
  flex-wrap: wrap;
`;

export default TimeCells;
