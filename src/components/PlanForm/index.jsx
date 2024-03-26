import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import IconTextButton from '../../shared/IconButton';
import TimeComponent from '../TimeSlots';
import ColorPicker from '../ColorPicker';
import Input from '../../shared/Input/Index';
import CommonButton from '../../shared/Button';
import ToastPopup from '../../shared/Toast';

import fetchPostSchedule from '../../services/schedule/fetchPostSchedule';
import fetchEditSchedule from '../../services/schedule/fetchEditSchedules';
import fetchUpdatePlan from '../../services/plan/fetchUpdatePlan';
import fetchPostPlan from '../../services/plan/fetchPostPlan';
import removeIcon from '../../assets/close_button_hover.png';
import addIcon from '../../assets/add_icon.png';
import checkedIcon from '../../assets/checked_icon.png';

import useCalendarStore from '../../store/calender';
import useScheduleStore from '../../store/schedules';
import usePlanStore from '../../store/plans';

function PlanForm({ plan, onClose, separatorIndex = null }) {
  const [isClickedAddTime, setIsClickedAddTime] = useState(false);
  const [colorCode, setColorCode] = useState('#0A7EED');
  const [description, setDescription] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [toast, setToast] = useState({});

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
      setIsSynced(plan.isSynced || false);
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

    let newPlanObject;

    if (plan) {
      const { planId } = plan;

      newPlanObject = {
        planId,
        selectedDate,
        title,
        description,
        startTime,
        endTime,
        colorCode,
        isSynced,
        completed: false,
      };

      if (startTime && endTime) {
        const newScheduleObject = {
          scheduleId: planId,
          selectedDate,
          title,
          description,
          startTime,
          endTime,
          colorCode,
          isSynced,
        };

        if (isSynced) {
          setPlan(newPlanObject, separatorIndex);
          setSchedule(newScheduleObject);
        } else {
          setPlan(newPlanObject, separatorIndex);
        }

        const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

        if (memberUser) {
          if (isSynced) {
            await fetchUpdatePlan(newPlanObject, memberUser);
            await fetchEditSchedule(newScheduleObject, memberUser);
          } else {
            await fetchUpdatePlan(newPlanObject, memberUser);
          }
        }

        setToast({ status: true, message: 'Plan이 정상적으로 수정되었습니다.' });

        onClose();

        return;
      } if (!startTime && !endTime) {
        setPlan(newPlanObject, separatorIndex);

        const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

        if (memberUser) {
          await fetchUpdatePlan(newPlanObject, memberUser);
        }

        setToast({ status: true, message: '새로운 Plan이 정상적으로 추가되었습니다.' });

        onClose();

        return;
      }
    } else {
      const planId = uuidv4();

      newPlanObject = {
        planId,
        selectedDate,
        title,
        description,
        startTime,
        endTime,
        colorCode,
        completed: false,
        isSynced,
      };

      if (startTime && endTime) {
        const newScheduleObject = {
          scheduleId: planId,
          selectedDate,
          title,
          description,
          startTime,
          endTime,
          colorCode,
          isSynced,
        };

        if (isSynced) {
          setPlan(newPlanObject, separatorIndex);
          setSchedule(newScheduleObject);
        } else {
          setPlan(newPlanObject, separatorIndex);
        }

        const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

        if (memberUser) {
          if (isSynced) {
            await fetchPostPlan(newPlanObject, memberUser);
            await fetchPostSchedule(newScheduleObject, memberUser);
          } else {
            await fetchPostPlan(newPlanObject, memberUser);
          }
        }

        onClose();

        return;
      } if (!startTime && !endTime) {
        setPlan(newPlanObject, separatorIndex);

        const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

        if (memberUser) {
          await fetchPostPlan(newPlanObject, memberUser);
        }

        onClose();

        return;
      }
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

  const handleToggle = () => {
    setIsSynced(!isSynced);
  };

  return (
    <>
      <h3>{plan ? 'Edit a Plan' : 'Add a Plan'}</h3>
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
      {(isClickedAddTime || (plan && (startTime && endTime))) ? (
        <>
          <TimeWrapper>
            <IconTextButton iconSrc={removeIcon} text="Remove Time" onClick={(e) => handleClickTimeButton(e, 'removeTime')} />
            {isSynced ? (
              <SyncedWrapper>
                <CheckedIcon src={checkedIcon} alt="Checked Icon" />
                <SyncedDescription>IsSynced</SyncedDescription>
              </SyncedWrapper>
            ) : (
              (startTime && endTime) && (
                <ToggleWrapper>
                  <ToggleDescription>Do 일정과 연동</ToggleDescription>
                  <ToggleButton isSynced={isSynced} onClick={handleToggle}>
                    <ToggleThumb isSynced={isSynced} />
                  </ToggleButton>
                </ToggleWrapper>
              )
            )}
          </TimeWrapper>
          <TimeComponent
            handleTimeChange={handleInputChange}
            time={plan ? {
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
        { plan ? 'Save edit' : 'Save Changes' }
      </CommonButton>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const SyncedWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckedIcon = styled.img`
  width: 12px;
  height: 12px;
  padding: 3px;
  background-color: #08f508;
  border-radius: 50%;
  margin-right: 5px;
`;

const SyncedDescription = styled.div`
  font-size: 12px;
  color: #4CAF50;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom:15px;
`;

const ToggleWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.isSynced ? '#4CAF50' : '#ccc')};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ToggleThumb = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isSynced ? '22px' : '2px')};
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
