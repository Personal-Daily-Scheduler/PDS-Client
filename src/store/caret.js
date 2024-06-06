import { create } from "zustand";
import { devtools } from "zustand/middleware";

const caretStore = (set) => ({
  cursorPosition: null,
  setCursorPosition: (position) => set({ cursorPosition: position }),
});

const useCursorPositionStore = create(devtools(caretStore));

export default useCursorPositionStore;
