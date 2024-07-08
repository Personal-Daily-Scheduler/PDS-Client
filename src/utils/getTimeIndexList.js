import initTimeMap from "./createTimeMap";

const getTimeIndexList = (startTime, endTime) => {
  const timeMap = initTimeMap();

  const startTimeIndex = timeMap.get(startTime).index;
  const endTimeIndex = timeMap.get(endTime).index;

  const timeIndexList = Array.from({
    length: endTimeIndex - startTimeIndex + 1,
  }, (_, index) => index + startTimeIndex);

  return timeIndexList;
};

export default getTimeIndexList;
