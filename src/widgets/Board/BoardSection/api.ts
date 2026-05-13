import axios from 'axios';

import {BASE_URL} from '@/consts/api';
import api from '@/src/api/axios';
import {Reaction} from '@/src/shared/types/models';

import {Message, Section} from './BoardSection.types';

type createMessageProps = {
	text: Message['text'];
	sectionId: Message['sectionId'];
	authorId?: Message['authorId'] | null;
};

export type updateMessageProps = {
	messageId: Message['id'];
	dto: Partial<Message>;
	sourceSectionId?: Section['id'];
};

type deleteMessageProps = {messageId: Message['id']};

type handleReactionProps = {messageId: Message['id']; reaction: Reaction};

export const createMessage = async ({
	text,
	sectionId,
	authorId,
}: createMessageProps): Promise<Message> => {
	const response = await api.post(
		`${BASE_URL}/api/messages`,
		{text, sectionId, authorId},
		{withCredentials: true},
	);

	return response.data;
};

export const getMessages = async (sectionId: Section['id']): Promise<{messages: Message[]}> => {
	const response = await api.get(`${BASE_URL}/api/messages/${sectionId}`);

	return response.data;
};

export const updateMessage = async ({messageId, dto}: updateMessageProps): Promise<Message[]> => {
	const response = await axios.post(`${BASE_URL}/api/messages/${messageId}/update`, dto);

	return response.data;
};

export const deleteMessage = async ({messageId}: deleteMessageProps) => {
	const response = await axios.delete(`${BASE_URL}/api/messages/${messageId}`);

	return response.data;
};

export const handleReaction = async ({messageId, reaction}: handleReactionProps) => {
	await api.post(`${BASE_URL}/api/messages/${messageId}/reaction`, {reactionId: reaction.id});
};
