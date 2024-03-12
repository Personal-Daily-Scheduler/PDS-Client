import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const planStore = (set) => ({
  userId: null,
  byDates: {},
  allDates: [],
  setPlan: (plan) => {
    const {
      userId, date, title, description, colorCode, startTime, endTime,
    } = plan;

    return set((state) => {
      if (!state.userId) {
        state.userId = userId;
      }

      if (!state.byDates[date]) {
        state.byDates[date] = {
          [startTime]: {
            title,
            description,
            colorCode,
            startTime,
            endTime,
            completed: false,
          },
        };
      } else {
        state.byDates[date] = {
          ...state.byDates[date],
          [startTime]: {
            title,
            description,
            colorCode,
            startTime,
            endTime,
            completed: false,
          },
        };
      }
      state.allDates = Array.from(
        new Set([...state.allDates, date]),
      );

      return { ...state };
    });
  },
  clearState: () => set(() => ({
    userId: null,
    byDates: {},
    allDates: [],
  })),
});

const usePlanStore = create(devtools(planStore));

export default usePlanStore;
