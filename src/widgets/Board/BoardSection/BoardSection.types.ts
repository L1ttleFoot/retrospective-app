import {Discussion} from '@/store/useDiscussions';

export interface Section {
	id: string;
	title: string;
	color: string;
	discussionId: string;
}

export interface Message {
	id: string;
	sectionId: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	color: string;
	emojies: {count: number; emoji: Emoji}[];
	authorId: string;
	ownerId: Discussion['ownerId'];
}

export interface Emoji {
	id: string;
	character: string;
}
