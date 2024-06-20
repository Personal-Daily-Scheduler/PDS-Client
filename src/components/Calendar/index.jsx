import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

import usePlanStore from "../../store/plans";
import useCalendarStore from "../../store/calender";

import formatDateToYYYYMMDD from "../../utils/formatDate";

function CustomCalendar({ width }) {
  const [markDate, setMarkDate] = useState([]);

  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { allDates } = usePlanStore();

  const handleDateClick = (clickedDate) => {
    const formatDate = formatDateToYYYYMMDD(clickedDate);

    setSelectedDate(formatDate);
  };

  useEffect(() => {
    setMarkDate([...allDates]);
  }, [allDates]);

  return (
    <CalendarWrapper width={width}>
      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        locale="en-EN"
        tileClassName={({ date }) => {
          if (markDate.find((x) => x === formatDateToYYYYMMDD(date))) {
            return "highlight";
          }
        }}
      />
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  overflow-y: auto;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid black;
  width: ${(props) => props.width};
  
  .highlight {
    background: #f3a95f;
  }
`;

export default CustomCalendar;
