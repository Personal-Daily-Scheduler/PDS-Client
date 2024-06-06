const formatHour = (hour) => {
  const hourNumber = parseInt(hour, 10);

  if (hourNumber === 0) {
    return "0 am";
  }

  if (hourNumber < 12) {
    return `${hourNumber}`;
  }

  if (hourNumber === 12) {
    return "12 pm";
  }

  return `${hourNumber - 12}`;
};

export default formatHour;
