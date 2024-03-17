import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import initTimeMap from '../utils/createTimeMap';
import setTimeMap from '../utils/setTimeMap';
import getTimeRange from '../utils/getTimeRange';

const scheduleStore = (set) => ({
  scheduleByDates: {},
  timeMaps: initTimeMap(),
  deleteSchedule: (scheduleObject) => {
    const {
      scheduleId, selectedDate, startTime, endTime,
    } = scheduleObject;

    return set((state) => {
      const timeRange = getTimeRange(startTime, endTime);

      const newTimeMap = new Map(state.scheduleByDates[selectedDate].timeSlots);

      timeRange.forEach((time) => {
        newTimeMap.set(time, {
          index: newTimeMap.get(time).index,
          schedule: '',
        });
      });

      state.scheduleByDates[selectedDate].timeSlots = newTimeMap;

      delete state.scheduleByDates[selectedDate].schedules[scheduleId];

      const scheduleLength = Object.keys(state.scheduleByDates[selectedDate].schedules).length;

      if (!scheduleLength) {
        state.scheduleByDates[selectedDate] = undefined;
      }

      return { scheduleByDates: { ...state.scheduleByDates } };
    });
  },
  setSchedule: (scheduleObject) => {
    const {
      scheduleId, selectedDate, startTime, endTime,
    } = scheduleObject;

    return set((state) => {
      if (!state.scheduleByDates[selectedDate]) {
        state.scheduleByDates[selectedDate] = {
          schedules: {},
          timeSlots: initTimeMap(),
        };
      }

      const newSchedule = {
        [scheduleId]: {
          timeList: getTimeRange(startTime, endTime),
          schedule: scheduleObject,
        },
      };

      const newTimeMap = setTimeMap(
        state.scheduleByDates[selectedDate].timeSlots,
        scheduleObject,
      );

      state.scheduleByDates[selectedDate].timeSlots = newTimeMap;

      state.scheduleByDates[selectedDate].schedules = {
        ...state.scheduleByDates[selectedDate].schedules,
        ...newSchedule,
      };

      return { scheduleByDates: { ...state.scheduleByDates } };
    });
  },
});

const useScheduleStore = create(devtools(scheduleStore));

export default useScheduleStore;
