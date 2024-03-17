import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const planStore = (set) => ({
  userId: null,
  planByDates: {},
  allDates: [],
  setCompleted: (date, planId) => set((state) => {
    state.planByDates[date][planId] = {
      ...state.planByDates[date][planId],
      completed: !state.planByDates[date][planId].completed,
    };

    return { planByDates: { ...state.planByDates } };
  }),
  deletePlan: (date, planId) => set((state) => {
    delete state.planByDates[date][planId];

    if (Object.keys(state.planByDates[date]).length === 0) {
      state.planByDates[date] = undefined;

      state.allDates = state.allDates.filter((existingDate) => existingDate !== date);
    }

    return {
      planByDates: { ...state.planByDates },
      allDates: [...state.allDates],
    };
  }),
  setPlan: (planObject) => {
    const { planId, userId, selectedDate } = planObject;

    return set((state) => {
      if (!state.userId) {
        state.userId = userId;
      }

      if (!state.planByDates[selectedDate]) {
        state.planByDates[selectedDate] = {
          [planId]: planObject,
        };
      } else {
        state.planByDates[selectedDate] = {
          ...state.planByDates[selectedDate],
          [planId]: planObject,
        };
      }

      state.allDates = Array.from(
        new Set([...state.allDates, selectedDate]),
      );

      return {
        planByDates: { ...state.planByDates },
        allDates: [...state.allDates],
      };
    });
  },
  clearPlan: () => set(() => ({
    userId: null,
    planByDates: {},
    allDates: [],
  })),
});

const usePlanStore = create(devtools(planStore));

export default usePlanStore;
