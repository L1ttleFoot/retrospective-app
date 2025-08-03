import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type theme = 'light' | 'dark' | 'win98';

interface ThemeStore {
	currentTheme: theme;
	changeTheme: (theme: theme) => void;
}

export const useTheme = create<ThemeStore>()(
	persist(
		(set) => ({currentTheme: 'light', changeTheme: (theme) => set(() => ({currentTheme: theme}))}),
		{name: 'theme-storage'},
	),
);
