import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';

function CustomCalendar() {
  const [value, onChange] = useState(new Date());

  const marks = [
    '15-01-2022',
    '03-01-2022',
    '07-01-2022',
    '13-01-2022',
    '13-01-2022',
    '15-01-2022',
  ];

  return (
    <CalendarWrapper>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-EN"
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
            const highlightClass = 'highlight';

            return highlightClass;
          }
        }}
      />
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  .highlight {
    background: #f3a95f;
  }
`;
export default CustomCalendar;
