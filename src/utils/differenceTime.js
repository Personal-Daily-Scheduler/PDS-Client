import timeToMinutes from './timeToMinutes';

const differenceTime = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return endMinutes - startMinutes;
};

export default differenceTime;
