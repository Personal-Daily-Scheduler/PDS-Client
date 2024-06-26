import getTimeRange from "./getTimeRange";

const updateTimeMap = (timeMap, scheduleObject) => {
  const targetTimeMap = new Map(timeMap);

  const { scheduleId, startTime, endTime } = scheduleObject;

  for (const [key, value] of timeMap) {
    const { schedule } = value;

    if (schedule !== "" && schedule.scheduleId === scheduleId) {
      const oldTimeRange = getTimeRange(schedule.startTime, schedule.endTime);

      oldTimeRange.forEach((scheduleTime) => {
        targetTimeMap.set(scheduleTime, {
          ...timeMap.get(scheduleTime),
          schedule: "",
        });
      });

      break;
    }
  }

  const newTimeRange = getTimeRange(startTime, endTime);

  newTimeRange.forEach((time) => {
    targetTimeMap.set(time, {
      ...timeMap.get(time),
      schedule: scheduleObject,
    });
  });

  return targetTimeMap;
};

export default updateTimeMap;
