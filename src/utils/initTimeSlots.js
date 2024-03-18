import createTimeSlots from './createTimeSlots';

const initTimeSlots = () => {
  const timeMap = new Map();

  createTimeSlots().forEach((item) => {
    timeMap.set(item, {
      timeList: [],
      schedule: '',
    });
  });

  return timeMap;
};

export default initTimeSlots;
