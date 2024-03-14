import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import TimeComponent from '../TimeSlots';
import ColorPicker from '../ColorPicker';
import Input from '../../shared/Input/Index';
import CommonButton from '../../shared/Button';
import ToastPopup from '../../shared/Toast';
import IconTextButton from '../../shared/IconButton';

import usePlanStore from '../../store/plans';
import useCalendarStore from '../../store/calender';

import addIcon from '../../assets/add_icon.png';
import removeIcon from '../../assets/close_button_hover.png';
import fetchPostPlan from '../../services/fetchPostPlan';

function PlanForm({ onSubmit: setPlanList }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [colorCode, setColorCode] = useState('#000000');
  const [isClickedAddTime, setIsClickedAddTime] = useState(false);
  const [toast, setToast] = useState({});

  const { setPlan } = usePlanStore();
  const { selectedDate } = useCalendarStore();

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
      const newPlanObject = {
        planId, selectedDate, title, description, startTime, endTime, colorCode, completed: false,
      };

      setPlan(newPlanObject);

      const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));
      if (memberUser) {
        await fetchPostPlan(newPlanObject, memberUser);
      }

      setPlanList(newPlanObject);

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

  const handleClickTimeButton = (e, type) => {
    e.preventDefault();

    if (type === 'removeTime') {
      setStartTime('');
      setEndTime('');
    }

    setIsClickedAddTime(!isClickedAddTime);
  };

  return (
    <>
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
      <Label>Time</Label>
      {isClickedAddTime ? (
        <>
          <IconTextButton iconSrc={removeIcon} text="Remove Time" onClick={(e) => handleClickTimeButton(e, 'removeTime')} />
          <TimeComponent handleTimeChange={handleInputChange}></TimeComponent>
        </>
      ) : (
        <IconTextButton iconSrc={addIcon} text="Add Time" onClick={(e) => handleClickTimeButton(e, 'addTime')} />
      )}
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

export default PlanForm;
