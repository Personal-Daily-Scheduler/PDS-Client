import { create } from "zustand";
import { devtools } from "zustand/middleware";

const planStore = (set) => ({
  userId: null,
  planByDates: {},
  allDates: [],
  setCompletedPlan: (date, planId) => set((state) => {
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
  setPlanList: (planList, selectedDate, separatorIndex) => set((state) => {
    planList.forEach((planObject, index) => {
      const { planId } = planObject;

      if (separatorIndex !== null && index === separatorIndex) {
        state.planByDates[selectedDate][planId] = planObject;
      } else {
        state.planByDates[selectedDate][planId] = planObject;
      }
    });

    state.allDates = Array.from(new Set([...state.allDates, selectedDate]));

    return {
      planByDates: { ...state.planByDates },
      allDates: [...state.allDates],
    };
  }),
  setPlan: (planObject, separatorIndex = null) => {
    const { planId, userId, selectedDate } = planObject;

    return set((state) => {
      if (!state.userId) {
        state.userId = userId;
      }

      if (!state.planByDates[selectedDate]) {
        state.planByDates[selectedDate] = {
          [planId]: planObject,
        };
      } else if (state.planByDates[selectedDate][planId]) {
        if (separatorIndex !== null) {
          const planList = Object.values(state.planByDates[selectedDate]);

          const existingIndex = planList.findIndex((plan) => plan.planId === planId);

          if (existingIndex !== -1) {
            const deletedPlan = planList.splice(existingIndex, 1);
            planList.splice(separatorIndex, 0, deletedPlan[0]);

            state.planByDates[selectedDate] = planList.reduce((acc, plan) => {
              acc[plan.planId] = plan;

              return acc;
            }, {});
          }
        } else {
          state.planByDates[selectedDate] = {
            ...state.planByDates[selectedDate],
            [planId]: {
              ...state.planByDates[selectedDate][planId],
              ...planObject,
            },
          };
        }
      } else {
        const planList = Object.values(state.planByDates[selectedDate]);

        if (separatorIndex !== null) {
          planList.splice(separatorIndex, 0, planObject);
        } else {
          planList.push(planObject);
        }

        state.planByDates[selectedDate] = planList.reduce((acc, plan) => {
          acc[plan.planId] = plan;

          return acc;
        }, {});

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
