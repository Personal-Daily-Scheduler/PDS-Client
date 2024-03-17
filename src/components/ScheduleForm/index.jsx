import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import TimeComponent from '../TimeSlots';
import ColorPicker from '../ColorPicker';
import Input from '../../shared/Input/Index';
import CommonButton from '../../shared/Button';
import ToastPopup from '../../shared/Toast';

import fetchPostPlan from '../../services/fetchPostPlan';
import fetchPostSchedule from '../../services/fetchPostSchedule';

import usePlanStore from '../../store/plans';
import useCalendarStore from '../../store/calender';
import useScheduleStore from '../../store/schedules';

function ScheduleForm({ onSubmit, schedule }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [colorCode, setColorCode] = useState('#000000');
  const [toast, setToast] = useState({});

  const { setPlan } = usePlanStore();
  const { setSchedule } = useScheduleStore();
  const { selectedDate } = useCalendarStore();

  useEffect(() => {
    if (schedule) {
      setStartTime(schedule.startTime);
      setEndTime(schedule.endTime);
    }
  }, [schedule]);

  const handleInputChange = (type, value) => {
    if (type === 'title') {
      setTitle(value);
    }

    if (type === 'description') {
      setDescription(value);
    }

    if (type === 'startTime') {
      setStartTime(value);
    }

    if (type === 'endTime') {
      setEndTime(value);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!title) {
      setToast({ status: true, message: '제목을 반드시 입력해야 합니다.' });

      return;
    }

    if ((!startTime && !endTime) || (startTime && endTime)) {
      const planId = uuidv4();

      const newPlan = {
        planId, selectedDate, title, description, startTime, endTime, colorCode, completed: false,
      };

      const scheduleId = uuidv4();

      const newSchedule = {
        scheduleId, selectedDate, title, description, startTime, endTime, colorCode,
      };

      setPlan(newPlan);
      setSchedule(newSchedule);

      const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

      if (memberUser) {
        await fetchPostSchedule(newSchedule, memberUser);
        await fetchPostPlan(newPlan, memberUser);
      }

      onSubmit(newPlan);

      return;
    }

    if (!startTime) {
      setToast({ status: true, message: '시작 시간이 비어있습니다.' });

      return;
    }

    if (!endTime) {
      setToast({ status: true, message: '종료 시간이 비어있습니다.' });
    }
  };

  return (
    <>
      <Label>Time</Label>
      {schedule ? (
        <TimeComponent handleTimeChange={handleInputChange} time={{ startTime, endTime }} />
      ) : (
        <TimeComponent handleTimeChange={handleInputChange} />
      )}
      <Input
        label="Title"
        type="text"
        placeholder="이벤트 이름을 입력하세요"
        onChange={(e) => handleInputChange('title', e.target.value)}
        value={title}
        size={{ width: '235px', height: '32px' }}
      />
      <Input
        label="Description"
        type="text"
        placeholder="이벤트 상세 내용을 입력하세요"
        onChange={(e) => handleInputChange('description', e.target.value)}
        value={description}
        size={{ width: '235px', height: '32px' }}
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

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export default ScheduleForm;
