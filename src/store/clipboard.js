import { create } from "zustand";
import { devtools } from "zustand/middleware";

const clipboardStore = (set) => ({
  copiedSchedule: null,
  isCopied: false,
  setCopiedSchedule: (copiedSchedule) => set({ copiedSchedule, isCopied: true }),
  clearClipboard: () => set({ copiedSchedule: null, isCopied: false }),
});

const useClipboardStore = create(devtools(clipboardStore));

export default useClipboardStore;
