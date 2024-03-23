import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import TimeComponent from '../TimeSlots';
import ColorPicker from '../ColorPicker';
import Input from '../../shared/Input/Index';
import CommonButton from '../../shared/Button';
import ToastPopup from '../../shared/Toast';
import IconTextButton from '../../shared/IconButton';

import addIcon from '../../assets/add_icon.png';
import removeIcon from '../../assets/close_button_hover.png';
import fetchPostPlan from '../../services/plan/fetchPostPlan';
import fetchPostSchedule from '../../services/schedule/fetchPostSchedule';
import fetchEditSchedule from '../../services/schedule/fetchEditSchedules';
import fetchUpdatePlan from '../../services/plan/fetchUpdatePlan';

import usePlanStore from '../../store/plans';
import useCalendarStore from '../../store/calender';
import useScheduleStore from '../../store/schedules';

function PlanForm({ onSubmit: setPlanList, plan, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [colorCode, setColorCode] = useState('#0A7EED');
  const [isClickedAddTime, setIsClickedAddTime] = useState(false);
  const [toast, setToast] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const { setPlan } = usePlanStore();
  const { setSchedule } = useScheduleStore();
  const { selectedDate } = useCalendarStore();

  useEffect(() => {
    if (plan) {
      setTitle(plan.title || '');
      setDescription(plan.description || '');
      setStartTime(plan.startTime || '');
      setEndTime(plan.endTime || '');
      setColorCode(plan.colorCode || '#0A7EED');
      setIsEditMode(true);
    }
  }, [plan]);

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
        planId: isEditMode ? plan.planId : planId,
        selectedDate,
        title,
        description,
        startTime,
        endTime,
        colorCode,
        completed: false,
      };

      const newScheduleObject = {
        scheduleId: isEditMode ? plan.planId : planId,
        selectedDate,
        title,
        description,
        startTime,
        endTime,
        colorCode,
      };

      const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

      if (startTime && endTime) {
        setPlan(newPlanObject);
        setSchedule(newScheduleObject);

        if (memberUser) {
          if (isEditMode) {
            await fetchUpdatePlan(newPlanObject, memberUser);
            await fetchEditSchedule(newScheduleObject, memberUser);
          } else {
            await fetchPostPlan(newPlanObject, memberUser);
            await fetchPostSchedule(newScheduleObject, memberUser);
          }
        }

        if (isEditMode) {
          setIsEditMode(false);
        }

        onClose();

        return;
      }
      setPlan(newPlanObject);

      if (memberUser) {
        await fetchPostPlan(newPlanObject, memberUser);
      }

      if (isEditMode) {
        setIsEditMode(false);
      }

      onClose();

      return;
    }

    if (!startTime) {
      if (isEditMode) {
        setIsEditMode(false);
      }

      setToast({ status: true, message: '시작 시간이 비어있습니다.' });

      return;
    }

    if (!endTime) {
      if (isEditMode) {
        setIsEditMode(false);
      }

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

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <TitleWrapper>
        <h3>{isEditMode ? 'Edit a Plan' : 'Add a Plan'}</h3>
        <ToggleWrapper>
          <ToggleButton isToggled={isToggled} onClick={handleToggle}>
            <ToggleThumb isToggled={isToggled} />
          </ToggleButton>
          <ToggleDescription>Do 일정과 연동</ToggleDescription>
        </ToggleWrapper>
      </TitleWrapper>
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
      {(isClickedAddTime || (isEditMode && (startTime && endTime))) ? (
        <>
          <IconTextButton iconSrc={removeIcon} text="Remove Time" onClick={(e) => handleClickTimeButton(e, 'removeTime')} />
          <TimeComponent
            handleTimeChange={handleInputChange}
            time={isEditMode ? {
              startTime: plan.startTime,
              endTime: plan.endTime,
            } : null}
          >
          </TimeComponent>
        </>
      ) : (
        <IconTextButton iconSrc={addIcon} text="Add Time" onClick={(e) => handleClickTimeButton(e, 'addTime')} />
      )}
      <Label>Color</Label>
      <ColorPicker onChange={(e) => setColorCode(e)} />
      <CommonButton width="235px" height="25px" onClick={handleSubmitForm}>
        { isEditMode ? 'Save edit' : 'Save Changes' }
      </CommonButton>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ToggleWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.isToggled ? '#4CAF50' : '#ccc')};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isToggled ? '22px' : '2px')};
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const ToggleDescription = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  font-size: 10px;
  color: #888;
  margin-top: 5px;
  white-space: nowrap;
`;

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
