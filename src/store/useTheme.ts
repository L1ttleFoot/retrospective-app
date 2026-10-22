import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type theme = 'light' | 'dark';

interface ThemeStore {
	currentTheme: theme;
	changeTheme: (theme: theme) => void;
	toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>()(
	persist(
		(set) => ({
			currentTheme: 'light',
			changeTheme: (theme) => set(() => ({currentTheme: theme})),
			toggleTheme: () =>
				set((state) =>
					state.currentTheme === 'light' ? {currentTheme: 'dark'} : {currentTheme: 'light'},
				),
		}),
		{name: 'theme-storage'},
	),
);
