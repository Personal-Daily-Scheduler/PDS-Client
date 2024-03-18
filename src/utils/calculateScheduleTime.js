import { v4 as uuidV4 } from 'uuid';

import differenceTime from './differenceTime';
import timeToMinutes from './timeToMinutes';
import minutesToTime from './minutesToTime';

const calculatePasteSchedule = (pasteStartTime, targetEvent) => {
  const { startTime, endTime } = targetEvent;

  const differenceMinutes = differenceTime(startTime, endTime);
  const pasteStartMinutes = timeToMinutes(pasteStartTime);

  const pasteTargetTime = {
    startTime: pasteStartTime,
    endTime: minutesToTime(pasteStartMinutes + differenceMinutes),
  };

  const newScheduleId = uuidV4();

  const newSchedule = {
    ...targetEvent,
    scheduleId: newScheduleId,
    ...pasteTargetTime,
  };

  return newSchedule;
};

export default calculatePasteSchedule;
