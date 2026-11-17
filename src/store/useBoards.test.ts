import {beforeEach, describe, expect, it} from 'vitest';

import {useBoards} from './useBoards';

const initialState = useBoards.getState();

describe('useBoards store', () => {
	beforeEach(() => {
		useBoards.setState(initialState, true);
	});

	it('currentBoardId по умолчанию не задан', () => {
		expect(useBoards.getState().currentBoardId).toBeUndefined();
	});

	it('setCurrentBoardId устанавливает id доски', () => {
		useBoards.getState().setCurrentBoardId('board-1');

		expect(useBoards.getState().currentBoardId).toBe('board-1');
	});

	it('setCurrentBoardId перезаписывает предыдущий id', () => {
		useBoards.getState().setCurrentBoardId('board-1');
		useBoards.getState().setCurrentBoardId('board-2');

		expect(useBoards.getState().currentBoardId).toBe('board-2');
	});

	it('setCurrentBoardId() без аргумента сбрасывает значение в undefined', () => {
		useBoards.getState().setCurrentBoardId('board-1');
		useBoards.getState().setCurrentBoardId();

		expect(useBoards.getState().currentBoardId).toBeUndefined();
	});
});
