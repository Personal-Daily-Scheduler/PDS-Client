import React from "react";
import styled from "styled-components";

import IconTextButton from "../../shared/IconButton";

import HomeIcon from "../../assets/home_button_icon.png";
import ScheduleIcon from "../../assets/timecell_button_icon.png";
import TimeCellIcon from "../../assets/schedule_icon.png";
import TextEditorIcon from "../../assets/texteditor_icon.png";
import AddIcon from "../../assets/add_icon.png";

import useViewModeStore from "../../store/useViewModeStore";

function TabUI({ onClickAddPlan }) {
  const { setViewMode } = useViewModeStore();

  return (
    <TabContainer>
      <IconTextButton iconSrc={HomeIcon} size="30px" onClick={() => setViewMode("home")}></IconTextButton>
      <IconTextButton iconSrc={ScheduleIcon} size="30px" onClick={() => setViewMode("schedules")}></IconTextButton>
      <IconTextButton iconSrc={AddIcon} size="30px" onClick={onClickAddPlan}></IconTextButton>
      <IconTextButton iconSrc={TimeCellIcon} size="30px" onClick={() => setViewMode("plans")}></IconTextButton>
      <IconTextButton iconSrc={TextEditorIcon} size="30px" onClick={() => setViewMode("editor")}></IconTextButton>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  border-top: 1px solid #d9d9d9;
`;

export default TabUI;
