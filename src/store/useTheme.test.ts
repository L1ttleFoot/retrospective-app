import {beforeEach, describe, expect, it} from 'vitest';

import {useTheme} from './useTheme';

const STORAGE_KEY = 'theme-storage';
const initialState = useTheme.getState();

const readStored = () => {
	const raw = localStorage.getItem(STORAGE_KEY);
	return raw ? JSON.parse(raw) : null;
};

describe('useTheme store', () => {
	beforeEach(() => {
		localStorage.clear();
		useTheme.setState(initialState, true);
	});

	it('имеет light по умолчанию', () => {
		expect(useTheme.getState().currentTheme).toBe('light');
	});

	it('changeTheme устанавливает переданную тему', () => {
		useTheme.getState().changeTheme('dark');

		expect(useTheme.getState().currentTheme).toBe('dark');
	});

	it('changeTheme на уже установленную тему ничего не меняет', () => {
		useTheme.getState().changeTheme('light');

		expect(useTheme.getState().currentTheme).toBe('light');
	});

	it('toggleTheme переключает light -> dark', () => {
		useTheme.getState().toggleTheme();

		expect(useTheme.getState().currentTheme).toBe('dark');
	});

	it('toggleTheme переключает dark -> light', () => {
		useTheme.getState().changeTheme('dark');
		useTheme.getState().toggleTheme();

		expect(useTheme.getState().currentTheme).toBe('light');
	});

	it('два toggleTheme возвращают исходную тему', () => {
		useTheme.getState().toggleTheme();
		useTheme.getState().toggleTheme();

		expect(useTheme.getState().currentTheme).toBe('light');
	});

	it('состояние пишется в localStorage под ключом theme-storage', () => {
		useTheme.getState().changeTheme('dark');

		expect(readStored()).toMatchObject({state: {currentTheme: 'dark'}});
	});

	it('toggleTheme тоже обновляет запись в localStorage', () => {
		useTheme.getState().toggleTheme();

		expect(readStored()).toMatchObject({state: {currentTheme: 'dark'}});
	});

	it('rehydrate подхватывает тему из localStorage', async () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({state: {currentTheme: 'dark'}, version: 0}));

		await useTheme.persist.rehydrate();

		expect(useTheme.getState().currentTheme).toBe('dark');
	});
});
