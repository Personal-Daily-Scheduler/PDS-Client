import differenceTime from "./differenceTime";
import timeToMinutes from "./timeToMinutes";
import minutesToTime from "./minutesToTime";

const calculateReplaceSchedule = (replaceStartTime, targetEvent) => {
  const { startTime, endTime } = targetEvent;

  const differenceMinutes = differenceTime(startTime, endTime);
  const replaceStartMinutes = timeToMinutes(replaceStartTime);

  const replacedTime = {
    startTime: replaceStartTime,
    endTime: minutesToTime(replaceStartMinutes + differenceMinutes),
  };

  const updateSchedule = {
    ...targetEvent,
    ...replacedTime,
  };

  return updateSchedule;
};

export default calculateReplaceSchedule;
