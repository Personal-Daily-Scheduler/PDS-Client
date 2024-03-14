import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const planStore = (set) => ({
  userId: null,
  byDates: {},
  allDates: [],
  setCompleted: (date, planId) => set((state) => {
    state.byDates[date][planId] = {
      ...state.byDates[date][planId],
      completed: !state.byDates[date][planId].completed,
    };

    return { byDates: { ...state.byDates } };
  }),
  deletePlan: (date, planId) => set((state) => {
    delete state.byDates[date][planId];

    if (Object.keys(state.byDates[date]).length === 0) {
      state.byDates[date] = undefined;

      state.allDates = state.allDates.filter((existingDate) => existingDate !== date);
    }

    return {
      byDates: { ...state.byDates },
      allDates: [...state.allDates],
    };
  }),
  setPlan: (planObject) => {
    const { planId, userId, selectedDate } = planObject;

    return set((state) => {
      if (!state.userId) {
        state.userId = userId;
      }

      if (!state.byDates[selectedDate]) {
        state.byDates[selectedDate] = {
          [planId]: planObject,
        };
      } else {
        state.byDates[selectedDate] = {
          ...state.byDates[selectedDate],
          [planId]: planObject,
        };
      }
      state.allDates = Array.from(
        new Set([...state.allDates, selectedDate]),
      );

      return {
        byDates: { ...state.byDates },
        allDates: [...state.allDates],
      };
    });
  },
  clearPlan: () => set(() => ({
    userId: null,
    byDates: {},
    allDates: [],
  })),
});

const usePlanStore = create(devtools(planStore));

export default usePlanStore;
