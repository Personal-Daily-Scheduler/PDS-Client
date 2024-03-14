import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const userStore = (set) => ({
  username: null,
  userId: null,
  token: null,
  setUser: (userData) => set({
    userId: userData.userId,
    username: userData.username,
  }),
  setToken: (token) => set({ token }),
  clearUser: () => set({
    username: null,
    userId: null,
    token: null,
  }),
});

const useUserStore = create(devtools(userStore));

export default useUserStore;
