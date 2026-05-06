import {create} from 'zustand';

export type Board = {id: string; title: string; createdAt: Date; ownerId: string};

type BoardsStore = {currentBoardId: string; setCurrentBoardId: (id?: string) => void};

export const useBoards = create<BoardsStore>()((set) => ({
	currentBoardId: '',
	setCurrentBoardId: (id) => set(() => ({currentBoardId: id})),
}));
