import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const diaryStore = (set) => ({
  diaryByDates: {},
  saveDiary: (diaryObject) => {
    const { diaryId, selectedDate } = diaryObject;

    return set((state) => {
      const updatedDiaryByDates = {
        ...state.diaryByDates,
        [selectedDate]: {
          ...(state.diaryByDates[selectedDate] || {}),
          [diaryId]: diaryObject,
        },
      };

      return { diaryByDates: { ...updatedDiaryByDates } };
    });
  },
});

const useDiaryStore = create(devtools(diaryStore));

export default useDiaryStore;
