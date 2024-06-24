import {
  useCallback, useEffect, useRef, useState,
} from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";

import TimeCell from "../TimeCell";
import Modal from "../../shared/Modal";
import ScheduleModal from "../ScheduleModal";
import ScheduleForm from "../ScheduleForm";
import ToastPopup from "../../shared/Toast";

import useScheduleStore from "../../store/schedules";
import useCalendarStore from "../../store/calender";
import useClipboardStore from "../../store/clipboard";
import usePlanStore from "../../store/plans";
import useMobileStore from "../../store/useMobileStore";

import initTimeMap from "../../utils/createTimeMap";
import fetchRemoveSchedule from "../../services/schedule/fetRemoveSchedule";
import fetchRemovePlan from "../../services/plan/fetchRemovePlan";
import getTimeRange from "../../utils/getTimeRange";
import calculatePasteSchedule from "../../utils/calculateScheduleTime";
import validPossiblePasteTime from "../../utils/validPossiblePasteTime";
import validOverlapTime from "../../utils/validOverlaptime";

function TimeCells({ viewMode }) {
  const [startCell, setStartCell] = useState({ index: "", time: "" });
  const [endCell, setEndCell] = useState({ index: "", time: "" });
  const [selectedCells, setSelectedCells] = useState([]);
  const [timeMap, setTimeMap] = useState(initTimeMap());
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [toast, setToast] = useState({ status: false, message: "" });

  const {
    timeMaps, setSchedule, scheduleByDates, deleteSchedule,
  } = useScheduleStore();
  const {
    isCopied, copiedSchedule, clearClipboard, setCopiedSchedule,
  } = useClipboardStore();
  const { deletePlan, setPlan } = usePlanStore();
  const { isMobile } = useMobileStore();
  const { selectedDate } = useCalendarStore();

  const timeSlots = useRef();

  const clearTimeSelection = () => {
    setSelectedCells([]);
    setStartCell({ index: "", time: "" });
    setEndCell({ index: "", time: "" });
    setIsDragging(false);
  };

  useEffect(() => {
    if (selectedDate && scheduleByDates[selectedDate]) {
      const dailyTimeMap = timeMaps;

      setTimeMap(dailyTimeMap);

      return;
    }

    if (selectedDate && !scheduleByDates[selectedDate]) {
      setTimeMap(initTimeMap());
    }
  }, [selectedDate, scheduleByDates]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragStart = (timeCell) => {
    setStartCell(timeCell);
    setSelectedCells([timeCell.index]);
    setIsDragging(true);
    handleCloseModal();
  };

  const handleOpenModal = (e) => {
    if (isMobile) {
      setModalPosition({ left: e.clientX - 70, top: e.clientY });
    } else {
      setModalPosition({ left: e.clientX, top: e.clientY });
    }

    setIsModalOpen(true);
  };

  const handleDragEnd = (timeCellInfo, e) => {
    const isDeselectedStart = !startCell.index && startCell.index !== 0;

    if (isDeselectedStart) {
      return;
    }

    const isHasSchedules = (!!(timeMap.get(startCell.time).schedule)
      && (timeMap.get(timeCellInfo.time).schedule));
    const isSameSchedule = (timeMap.get(startCell.time).schedule)
      === (timeMap.get(timeCellInfo.time).schedule);

    if (isHasSchedules && isSameSchedule) {
      const { startTime, endTime } = timeMap.get(timeCellInfo.time).schedule;

      const startTimeIndex = timeMap.get(startTime).index;
      const endTimeIndex = timeMap.get(endTime).index;

      const scheduleIndexArray = Array.from({
        length: endTimeIndex - startTimeIndex + 1,
      }, (_, index) => index + startTimeIndex);

      setSelectedCells(scheduleIndexArray);
      setStartCell({ index: startTimeIndex, time: startTime });
      setEndCell({ index: endTimeIndex, time: endTime });
      setIsDragging(false);

      handleOpenModal(e);

      return;
    }

    const isHasSchedule = (timeMap.get(startCell.time).schedule !== "")
      || (timeMap.get(timeCellInfo.time).schedule !== "");

    if (isHasSchedule) {
      const selectedTimeList = getTimeRange(startCell.time, timeCellInfo.time);

      const emptyTimeList = selectedTimeList.filter((time) => timeMap.get(time).schedule === "");
      const emptyTimeIndex = emptyTimeList.map((time) => timeMap.get(time).index);

      setStartCell({
        index: emptyTimeIndex[0],
        time: emptyTimeList[0],
      });
      setEndCell({
        index: emptyTimeIndex[emptyTimeIndex.length - 1],
        time: emptyTimeList[emptyTimeList.length - 1],
      });
      setSelectedCells(emptyTimeIndex);
      setIsDragging(false);

      handleOpenModal(e);

      return;
    }

    const start = Math.min(startCell.index, timeCellInfo.index);
    const end = Math.max(startCell.index, timeCellInfo.index);

    const isReverseSelection = startCell.index > timeCellInfo.index;

    if (isReverseSelection) {
      setStartCell(timeCellInfo);
      setEndCell(startCell);
    } else {
      setEndCell(timeCellInfo);
    }

    const selectedIndexList = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    setSelectedCells(selectedIndexList);
    setIsDragging(false);

    handleOpenModal(e);
  };

  const handleCellClick = (timeCellInfo) => {
    if (isModalOpen) {
      return;
    }

    if (isDragging) {
      handleDragEnd(timeCellInfo);

      return;
    }

    setEndCell({ time: "", index: "" });

    handleDragStart(timeCellInfo);
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

  const submitScheduleForm = () => {
    clearTimeSelection();
    setIsSecondModalOpen(false);
    setIsModalOpen(false);
  };

  const hoursArray = Array.from({ length: 24 }, (_, index) => index);

  const handleOpenSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const secondModalPosition = {
    top: modalPosition.top + 90,
    left: modalPosition.left,
  };

  const handleCloseSecondModal = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    clearTimeSelection();
  };

  const handleDeleteButton = async () => {
    const deleteTarget = timeMap.get(startCell.time).schedule;

    if (deleteTarget.isSynced) {
      deleteSchedule(deleteTarget);
      deletePlan(selectedDate, deleteTarget.scheduleId);
    } else {
      deleteSchedule(deleteTarget);
    }

    const memberUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));

    if (memberUser) {
      if (deleteTarget.isSynced) {
        const { scheduleId, ...rest } = deleteTarget;

        const targetPlan = {
          planId: scheduleId,
          ...rest,
        };

        await fetchRemoveSchedule(deleteTarget, memberUser);
        await fetchRemovePlan(targetPlan, memberUser);
      } else {
        await fetchRemoveSchedule(deleteTarget, memberUser);
      }
    }

    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    setToast({ status: true, message: "일정이 정상적으로 삭제되었습니다." });

    clearTimeSelection();
  };

  const handleClickCopy = async () => {
    const copyTarget = timeMap.get(startCell.time).schedule;

    setCopiedSchedule(copyTarget);
    setToast({ status: true, message: "일정이 복사되었습니다." });
    setIsModalOpen(false);

    clearTimeSelection();
  };

  const handleClickPaste = async () => {
    const newSchedule = calculatePasteSchedule(startCell.time, copiedSchedule);
    const { scheduleId, ...rest } = newSchedule;

    const newPlan = { planId: uuidV4(), ...rest, completed: false };

    const isPossiblePasteTime = validPossiblePasteTime(timeMap, newSchedule);
    const isNonOverlapTime = validOverlapTime(copiedSchedule, newSchedule);

    if (!isPossiblePasteTime || !isNonOverlapTime) {
      setToast({ status: true, message: "일정이 존재하는 시간이 포함되어있습니다." });
      setIsModalOpen(false);

      clearTimeSelection();

      return;
    }

    if (newSchedule.isSynced) {
      setSchedule(newSchedule);
      setPlan(newPlan);
    } else {
      setSchedule(newSchedule);
    }

    setIsModalOpen(false);
    setToast({ status: true, message: "일정이 붙여넣기 되었습니다." });

    clearClipboard();
  };

  const taskModal = () => (
    <Modal onClose={handleCloseModal} style={modalPosition} darkBackground={false} borderRadius="20px">
      {timeMap.get(startCell.time).schedule && timeMap.get(endCell.time).schedule ? (
        <ScheduleModal onCreate={handleOpenSecondModal} onDelete={handleDeleteButton} onCopy={handleClickCopy} />
      ) : (
        isCopied ? (
          <ScheduleModal onCreate={handleOpenSecondModal} onPaste={handleClickPaste} />
        ) : (
          <ScheduleModal onCreate={handleOpenSecondModal} />
        )
      )}
    </Modal>
  );

  return (
    <>
      {isModalOpen && taskModal()}
      {isSecondModalOpen && (
        <Modal onClose={handleCloseSecondModal} style={isMobile ? undefined : secondModalPosition} darkBackground={false}>
          <ScheduleForm
            onSubmit={handleCloseSecondModal}
            time={{
              startTime: startCell.time,
              endTime: endCell.time,
            }}
          />
        </Modal>
      )}
      <CellContainer>
        <HoursWrapper>
          {hoursArray.map((hour) => (
            <TimeCell key={hour} hour={hour} viewMode={viewMode}>{hour}</TimeCell>
          ))}
        </HoursWrapper>
        <TimeWrapper viewMode={viewMode} ref={timeSlots}>
          {[...timeMap.entries()].map(([key, value]) => (
            <TimeCell
              key={uuidV4()}
              id={{
                time: key,
                index: value.index,
              }}
              onDragEnd={handleDragEnd}
              onMouseEnter={handleMouseEnter}
              onMouseDown={() => handleCellClick({
                time: key,
                index: value.index,
              })}
              isDragging={selectedCells.includes(value.index)}
              schedule={value.schedule}
              viewMode={viewMode}
            />
          ))}
        </TimeWrapper>
      </CellContainer>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%
`;

const HoursWrapper = styled.div`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`;

const TimeWrapper = styled.div`
  width: ${({ viewMode }) => (viewMode === "home" ? "150px" : "222px")};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
`;

export default TimeCells;
