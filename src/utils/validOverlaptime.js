import getTimeRange from "./getTimeRange";

const validOverlapTime = (copySchedule, pasteSchedule) => {
  const copyTimeRange = getTimeRange(copySchedule.startTime, copySchedule.endTime);
  const pasteTimeRange = getTimeRange(pasteSchedule.startTime, pasteSchedule.endTime);
  const duplicatedTime = pasteTimeRange.filter((pasteTime) => copyTimeRange.includes(pasteTime));

  return duplicatedTime.length === 0;
};

export default validOverlapTime;
