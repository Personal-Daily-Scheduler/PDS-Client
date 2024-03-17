import createTimeSlots from './createTimeSlots';

const initTimeMap = () => {
  const timeMap = new Map();

  createTimeSlots().forEach((item, index) => {
    timeMap.set(item, {
      index,
      schedule: '',
    });
  });

  return timeMap;
};

export default initTimeMap;
