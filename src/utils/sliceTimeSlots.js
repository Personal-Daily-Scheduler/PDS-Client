const sliceTimeSlots = (timesArray, sliceSize) => {
  const slicedTimes = [];

  for (let i = 0; i < timesArray.length; i += sliceSize) {
    slicedTimes.push(timesArray.slice(i, i + sliceSize));
  }

  return slicedTimes;
};

export default sliceTimeSlots;
