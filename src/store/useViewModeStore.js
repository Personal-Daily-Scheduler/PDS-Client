import { create } from "zustand";
import { devtools } from "zustand/middleware";

const viewModeStore = (set) => ({
    viewMode: "home",
    setViewMode: (mode) => set({ viewMode: mode }),
});

const useViewModeStore = create(devtools(viewModeStore));

export default useViewModeStore;
