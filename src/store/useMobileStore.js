import { create } from "zustand";
import { devtools } from "zustand/middleware";

const mobileStore = (set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
});

const useMobileStore = create(devtools(mobileStore));

export default useMobileStore;
