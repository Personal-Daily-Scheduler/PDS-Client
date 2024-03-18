import getTimeRange from './getTimeRange';

const updateTimeSlots = (timeSlots, scheduleObject) => {
  const targetTimeSlots = new Map(timeSlots);

  const { scheduleId, startTime, endTime } = scheduleObject;

  for (const [key, value] of timeSlots) {
    const { timeList, schedule } = value;

    if (schedule !== '' && schedule.scheduleId === scheduleId) {
      timeList.forEach((scheduleTime) => {
        targetTimeSlots.set(scheduleTime, {
          timeList: [],
          schedule: '',
        });
      });

      break;
    }
  }

  const timeRange = getTimeRange(startTime, endTime);

  timeRange.forEach((time) => {
    targetTimeSlots.set(time, {
      timeList: timeRange,
      schedule: scheduleObject,
    });
  });

  return targetTimeSlots;
};

export default updateTimeSlots;
