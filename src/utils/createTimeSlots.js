const createTimeSlots = () => {
  const times = [];

  for (let i = 0; i < 24; i += 1) {
    for (let j = 0; j < 6; j += 1) {
      const [hourString, minString] = [i.toString(), j.toString()];
      const hour = hourString.length < 2 ? `0${hourString}` : hourString;
      const minutes = `${minString}0`;

      times.push(`${hour}:${minutes}`);
    }
  }

  return times;
};

export default createTimeSlots;
