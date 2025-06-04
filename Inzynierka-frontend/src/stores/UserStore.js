import { create } from 'zustand'

const UserStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
}))

export default UserStore;
