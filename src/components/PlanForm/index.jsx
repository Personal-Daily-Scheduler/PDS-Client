import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../shared/Input/Index';
import TimeComponent from '../TimeSlots';
import ColorPicker from '../ColorPicker';
import CommonButton from '../../shared/Button';

function CreatePlanForm({ onSubmit }) {
  const [planTitle, setPlanTitle] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#b32aa9');

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'title':
        setPlanTitle(value);
        break;
      case 'description':
        setPlanDescription(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      planTitle, planDescription, startTime, endTime,
    });
  };

  const presetColors = ['#cd9323', '#1a53d8', '#9a2151', '#0d6416', '#8d2808'];
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        type="text"
        placeholder="이벤트 이름을 입력하세요"
        onChange={(e) => handleInputChange('title', e.target.value)}
        value={planTitle}
        size={{ width: '235px', height: '32px' }}
      />
      <Input
        label="Description"
        type="text"
        placeholder="이벤트 상세 내용을 입력하세요"
        onChange={(e) => handleInputChange('description', e.target.value)}
        value={planDescription}
        size={{ width: '235px', height: '32px' }}
      />
      <Label>Time</Label>
      <TimeComponent></TimeComponent>
      <Label>Color</Label>
      <ColorPicker
        color={color}
        onChange={setColor}
      />
      <CommonButton width="235px" height="25px" onClick={handleSubmit}>
        Save Changes
      </CommonButton>
    </form>
  );
}

export default CreatePlanForm;

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
