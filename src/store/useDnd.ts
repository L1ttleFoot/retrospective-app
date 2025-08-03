import {create} from 'zustand';

type DndStore = {
	draggingId?: string;
	sourceSectionId?: string;
	destinationSectionId?: string;
	setDraggingId: (id: string) => void;
	setSourceSectionId: (id: string) => void;
};

export const useDnd = () =>
	create<DndStore>()((set) => ({
		draggingId: undefined,
		sourceSectionId: undefined,
		destinationSectionId: undefined,
		setDraggingId: (id: string) => set(() => ({draggingId: id})),
		setSourceSectionId: (id: string) => set(() => ({sourceSectionId: id})),
	}));
