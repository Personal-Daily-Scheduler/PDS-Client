import React, { useState } from 'react';
import Input from '../../shared/Input/Index';

function CreatePlanForm({ onSubmit }) {
  const [planTitle, setPlanTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(planTitle);
  };

  const handleChangeTitle = (e) => {
    setPlanTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        type="text"
        placeholder="할일의 제목을 입력해주세요"
        onChange={handleChangeTitle}
        value={planTitle}
        width="200px"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePlanForm;
