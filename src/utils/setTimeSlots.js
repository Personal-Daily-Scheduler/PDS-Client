import getTimeRange from './getTimeRange';

const setTimeSlots = (timeSlots, scheduleObject) => {
  const newTimeSlots = new Map(timeSlots);

  const { startTime, endTime } = scheduleObject;

  const timeRange = getTimeRange(startTime, endTime);

  timeRange.forEach((time) => {
    newTimeSlots.set(time, {
      timeList: timeRange,
      schedule: scheduleObject,
    });
  });

  return newTimeSlots;
};

export default setTimeSlots;
