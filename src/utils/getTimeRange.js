import minutesToTime from "./minutesToTime";
import timeToMinutes from "./timeToMinutes";

const getTimeRange = (start, end) => {
  const timeList = [];

  const startTime = timeToMinutes(start);
  const endTime = timeToMinutes(end);

  const sortedStartTime = startTime > endTime ? endTime : startTime;
  const sortedEndTime = startTime > endTime ? startTime : endTime;

  for (let i = sortedStartTime; i <= sortedEndTime; i += 10) {
    timeList.push(minutesToTime(i));
  }

  return timeList;
};

export default getTimeRange;
