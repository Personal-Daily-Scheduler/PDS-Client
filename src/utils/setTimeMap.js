import getTimeRange from "./getTimeRange";

const setTimeMap = (timeMap, scheduleObject) => {
  const targetTimeMap = new Map(timeMap);

  const { startTime, endTime } = scheduleObject;

  const timeRange = getTimeRange(startTime, endTime);

  timeRange.forEach((time) => {
    targetTimeMap.set(time, {
      index: timeMap.get(time).index,
      schedule: scheduleObject,
    });
  });
  return targetTimeMap;
};

export default setTimeMap;
