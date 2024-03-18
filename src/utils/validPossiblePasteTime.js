import getTimeRange from './getTimeRange';

const validPossiblePasteTime = (timeMap, newSchedule) => {
  const { startTime, endTime } = newSchedule;

  const pasteTimeRange = getTimeRange(startTime, endTime);

  const existScheduleTime = pasteTimeRange.filter((pastTime) => timeMap.get(pastTime).schedule !== '');

  return existScheduleTime.length === 0;
};

export default validPossiblePasteTime;
