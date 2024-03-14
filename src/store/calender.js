import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const calendarStore = (set) => ({
  viewMode: 'week',
  currentDate: new Date(),
  selectedDate: null,

  setViewMode: (mode) => set({ viewMode: mode }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  clearCalendar: () => set({
    viewMode: 'week',
    currentDate: new Date(),
    selectedDate: null,
  }),
});

const useCalendarStore = create(devtools(calendarStore));

export default useCalendarStore;
