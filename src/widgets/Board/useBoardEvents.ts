import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

import {BASE_URL} from '@/consts/api';

type EventPayload = {sectionId: string; fromSectionId?: string};

const MESSAGE_EVENTS: Record<string, (payload: EventPayload) => unknown[][]> = {
	'message.created': (p) => [['messages', p.sectionId]],
	'message.deleted': (p) => [['messages', p.sectionId]],
	'message.updated': (p) => [['messages', p.sectionId]],
	'message.moved': (p) => [
		['messages', p.sectionId],
		['messages', p.fromSectionId],
	],
	'reaction.setted': (p) => [['messages', p.sectionId]],
};

export const useBoardEvents = (boardId: string | null | undefined) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!boardId) return;

		const eventSource = new EventSource(`${BASE_URL}/api/boards/${boardId}/events`);

		for (const [name, getKeys] of Object.entries(MESSAGE_EVENTS)) {
			eventSource.addEventListener(name, (event) => {
				const payload: EventPayload = JSON.parse(event.data);

				for (const queryKey of getKeys(payload)) {
					queryClient.invalidateQueries({queryKey});
				}
			});
		}

		return () => eventSource.close();
	}, [queryClient, boardId]);
};
