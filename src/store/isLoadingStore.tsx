import { create } from 'zustand';

interface LoadingStore {
    isLoadingPage: boolean;
    setLoadingPage: (value: boolean) => void;
}

const useLoadingStore = create<LoadingStore>()((set) => ({
    isLoadingPage: false,
    setLoadingPage: (value) => set((state) => ({ isLoadingPage: value })),
}));

export default useLoadingStore;
