import { create } from "zustand";
import { devtools } from "zustand/middleware";

import initTimeMap from "../utils/createTimeMap";
import initTimeSlots from "../utils/initTimeSlots";
import setTimeMap from "../utils/setTimeMap";
import setTimeSlots from "../utils/setTimeSlots";
import getTimeRange from "../utils/getTimeRange";
import updateTimeMap from "../utils/updateTimeMap";
import updateTimeSlots from "../utils/updateTimeSlots";

const scheduleStore = (set) => ({
  scheduleByDates: {},
  timeMaps: initTimeMap(),
  setCompletedSchedule: (scheduleObject) => set((state) => {
    const {
      scheduleId, selectedDate, completed,
    } = scheduleObject;

    const completedSchedule = {
      ...scheduleObject,
      completed: !completed,
    };

    state.scheduleByDates[selectedDate].schedules[scheduleId].schedule = completedSchedule;

    const newTimeSlots = updateTimeSlots(
      state.scheduleByDates[selectedDate].timeSlots,
      completedSchedule,
    );

    state.scheduleByDates[selectedDate].timeSlots = newTimeSlots;

    const updatedTimeMap = updateTimeMap(
      state.timeMaps,
      completedSchedule,
    );

    return {
      scheduleByDates: { ...state.scheduleByDates },
      timeMaps: updatedTimeMap,
    };
  }),
  deleteSchedule: (scheduleObject) => {
    const {
      scheduleId, selectedDate, startTime, endTime,
    } = scheduleObject;

    return set((state) => {
      const timeRange = getTimeRange(startTime, endTime);

      new Map(state.scheduleByDates[selectedDate].timeSlots);

      let newTimeMap = new Map(state.timeMaps);

      timeRange.forEach((time) => {
        newTimeMap.set(time, {
          index: newTimeMap.get(time).index,
          schedule: "",
        });
      });

      state.scheduleByDates[selectedDate].timeSlots = newTimeMap;

      delete state.scheduleByDates[selectedDate].schedules[scheduleId];

      const scheduleLength = Object.keys(state.scheduleByDates[selectedDate].schedules).length;

      if (!scheduleLength) {
        state.scheduleByDates[selectedDate] = undefined;
        newTimeMap = initTimeMap();
      }

      return {
        scheduleByDates: { ...state.scheduleByDates },
        timeMaps: newTimeMap,
      };
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
          timeSlots: initTimeSlots(),
        };

        const initMap = initTimeMap();

        state.timeMaps = initMap;
      }

      const newSchedule = {
        [scheduleId]: {
          timeList: getTimeRange(startTime, endTime),
          schedule: scheduleObject,
        },
      };

      if (state.scheduleByDates[selectedDate].schedules[scheduleId]) {
        state.scheduleByDates[selectedDate].schedules[scheduleId] = newSchedule[scheduleId];

        const newTimeSlots = updateTimeSlots(
          state.scheduleByDates[selectedDate].timeSlots,
          scheduleObject,
        );

        const updatedTimeMap = updateTimeMap(
          state.timeMaps,
          scheduleObject,
        );

        state.scheduleByDates[selectedDate].timeSlots = newTimeSlots;

        return {
          scheduleByDates: { ...state.scheduleByDates },
          timeMaps: updatedTimeMap,
        };
      }

      state.scheduleByDates[selectedDate].schedules = {
        ...state.scheduleByDates[selectedDate].schedules,
        ...newSchedule,
      };

      const newTimeSlots = setTimeSlots(
        state.scheduleByDates[selectedDate].timeSlots,
        scheduleObject,
      );

      state.scheduleByDates[selectedDate].timeSlots = newTimeSlots;

      const newTimeMap = setTimeMap(
        state.timeMaps,
        scheduleObject,
      );

      return {
        scheduleByDates: { ...state.scheduleByDates },
        timeMaps: new Map(newTimeMap),
      };
    });
  },
  clearSchedules: () => set(() => ({
    scheduleByDates: {},
    timeMaps: initTimeMap(),
  })),
});

const useScheduleStore = create(devtools(scheduleStore));

export default useScheduleStore;
