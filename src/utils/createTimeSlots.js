const createTimeSlots = (startTime = null) => {
  const times = [];
  let hour = startTime ? parseInt(startTime.split(':')[0], 10) : 0;
  let minute = startTime ? parseInt(startTime.split(':')[1], 10) : 0;

  while (hour < 24) {
    const hourString = hour.toString().padStart(2, '0');
    const minuteString = minute.toString().padStart(2, '0');
    times.push(`${hourString}:${minuteString}`);

    minute += 10;
    if (minute === 60) {
      hour += 1;
      minute = 0;
    }
  }

  return times;
};

export default createTimeSlots;
