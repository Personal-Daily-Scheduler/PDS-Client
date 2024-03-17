const getTimeRange = (start, end) => {
  const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);

    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

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
