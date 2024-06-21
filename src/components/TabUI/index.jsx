import React from "react";
import styled from "styled-components";

import IconTextButton from "../../shared/IconButton";

import HomeIcon from "../../assets/home_button_icon.png";
import ScheduleIcon from "../../assets/schedule_icon.png";
import TimeCellIcon from "../../assets/timecell_button_icon.png";
import TextEditorIcon from "../../assets/texteditor_icon.png";
import AddIcon from "../../assets/add_icon.png";
import TodayIcon from "../../assets/today_icon_2.png";

function TabUI({ onViewModeChange, onClickAddPlan }) {
  return (
    <TabContainer>
      <IconTextButton iconSrc={HomeIcon} size="30px" onClick={(e) => onViewModeChange("home")}></IconTextButton>
      <IconTextButton iconSrc={ScheduleIcon} size="30px" onClick={(e) => onViewModeChange("schedules")}></IconTextButton>
      <IconTextButton iconSrc={AddIcon} size="30px" onClick={(e) => onClickAddPlan()}></IconTextButton>
      <IconTextButton iconSrc={TimeCellIcon} size="30px" onClick={(e) => onViewModeChange("plans")}></IconTextButton>
      <IconTextButton iconSrc={TextEditorIcon} size="30px" onClick={(e) => onViewModeChange("editor")}></IconTextButton>
      <IconTextButton iconSrc={TodayIcon} size="30px"></IconTextButton>
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
