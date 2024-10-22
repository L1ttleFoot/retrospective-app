import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IThemeStore {
    currentTheme: string;
    toggleTheme: () => void;
}

export const useTheme = create<IThemeStore>()(
    persist(
        (set, get) => ({
            currentTheme: 'ligth',
            toggleTheme: () =>
                set(() => ({currentTheme: get().currentTheme === 'ligth' ? 'dark' : 'ligth'})),
        }),
        {
            name: 'theme-storage',
        },
    ),
);
