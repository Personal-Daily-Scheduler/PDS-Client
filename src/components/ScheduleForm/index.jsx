import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";

import TimeComponent from "../TimeSlots";
import ColorPicker from "../ColorPicker";
import Input from "../../shared/Input/Index";
import CommonButton from "../../shared/Button";
import ToastPopup from "../../shared/Toast";

import fetchPostPlan from "../../services/plan/fetchPostPlan";
import fetchPostSchedule from "../../services/schedule/fetchPostSchedule";
import checkedIcon from "../../assets/checked_icon.png";

import usePlanStore from "../../store/plans";
import useCalendarStore from "../../store/calender";
import useScheduleStore from "../../store/schedules";

function ScheduleForm({ onSubmit, time }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSynced, setIsSynced] = useState(false);
  const [colorCode, setColorCode] = useState("#ade0fd");
  const [toast, setToast] = useState({});

  const { setPlan } = usePlanStore();
  const { setSchedule } = useScheduleStore();
  const { selectedDate } = useCalendarStore();

  useEffect(() => {
    if (time) {
      setStartTime(time.startTime);
      setEndTime(time.endTime);
    }
  }, [time]);

  const handleInputChange = (type, value) => {
    if (type === "title") {
      setTitle(value);
    }

    if (type === "description") {
      setDescription(value);
    }

    if (type === "startTime") {
      setStartTime(value);
    }

    if (type === "endTime") {
      setEndTime(value);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!title) {
      setToast({ status: true, message: "제목을 반드시 입력해야 합니다." });

      return;
    }

    if ((!startTime && !endTime) || (startTime && endTime)) {
      const objectId = uuidV4();

      const eventContent = {
        selectedDate, title, description, startTime, endTime, colorCode, isSynced, completed: false,
      };

      const newPlan = {
        planId: objectId, ...eventContent,
      };

      const newSchedule = {
        scheduleId: objectId, ...eventContent,
      };

      if (isSynced) {
        setSchedule(newSchedule);
        setPlan(newPlan);
      } else {
        setSchedule(newSchedule);
      }

      const memberUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));

      if (memberUser) {
        if (isSynced) {
          await fetchPostSchedule(newSchedule, memberUser);
          await fetchPostPlan(newPlan, memberUser);
        } else {
          await fetchPostSchedule(newSchedule, memberUser);
        }
      }

      onSubmit();

      return;
    }

    if (!startTime) {
      setToast({ status: true, message: "시작 시간이 비어있습니다." });

      return;
    }

    if (!endTime) {
      setToast({ status: true, message: "종료 시간이 비어있습니다." });
    }
  };

  const handleToggle = () => {
    setIsSynced(!isSynced);
  };

  return (
    <>
      <h2>Add New Event</h2>
      <Label>
        Time
        <ToggleContainer>
          <IconSpace isSynced={isSynced}>
            {isSynced && (
              <SyncedWrapper>
                <CheckedIcon src={checkedIcon} alt="Checked Icon" />
                <SyncedDescription>IsSynced</SyncedDescription>
              </SyncedWrapper>
            )}
          </IconSpace>
          <ToggleWrapper>
            <ToggleDescription>Plan 연동</ToggleDescription>
            <ToggleButton isSynced={isSynced} onClick={handleToggle}>
              <ToggleThumb isSynced={isSynced} />
            </ToggleButton>
          </ToggleWrapper>
        </ToggleContainer>
      </Label>
      {time ? (
        <TimeComponent handleTimeChange={handleInputChange} time={{ startTime, endTime }} />
      ) : (
        <TimeComponent handleTimeChange={handleInputChange} />
      )}
      <Input
        label="Title"
        type="text"
        placeholder="이벤트 이름을 입력하세요"
        onChange={(e) => handleInputChange("title", e.target.value)}
        value={title}
        size={{ width: "235px", height: "32px" }}
      />
      <Input
        label="Description"
        type="text"
        placeholder="이벤트 상세 내용을 입력하세요"
        onChange={(e) => handleInputChange("description", e.target.value)}
        value={description}
        size={{ width: "235px", height: "32px" }}
      />
      <Label>Color</Label>
      <ColorPicker
        color={colorCode}
        onChange={setColorCode}
      />
      <CommonButton width="235px" height="25px" onClick={handleSubmitForm}>
        Save Changes
      </CommonButton>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message}></ToastPopup>
      )}
    </>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconSpace = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SyncedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const CheckedIcon = styled.img`
  width: 11px;
  height: 11px;
  padding: 3px;
  margin-right: 4px;
  background-color: #08f508;
  border-radius: 50%;
`;

const SyncedDescription = styled.div`
  font-size: 12px;
  color: #4CAF50;
`;

const ToggleWrapper = styled.div`
  margin-left: 20px;
  position: relative;
  transition: background-color 0.5s;
`;

const ToggleButton = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.isSynced ? "#4CAF50" : "#ccc")};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isSynced ? "22px" : "2px")};
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const ToggleDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 100%;
  font-size: 8px;
  color: #888;
  margin-bottom: 3px;
  white-space: nowrap;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export default ScheduleForm;
