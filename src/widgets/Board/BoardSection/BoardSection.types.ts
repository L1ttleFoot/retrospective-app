import {Board} from '@/store/useBoards';

export type Section = {id: string; title: string; color: string; boardId: string};

export type Message = {
	id: string;
	sectionId: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	color: string;
	reactions: UserReaction[];
	authorId: string;
	ownerId: Board['ownerId'];
};

export type UserReaction = {value: string; id: string; count: number; isSelected: boolean};
