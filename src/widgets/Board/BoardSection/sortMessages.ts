import {Message} from './BoardSection.types';

export const sortMessages = (messagesList: Message[]) => {
	const pinned = messagesList.filter((m) => m.pinnedAt);
	const unpinned = messagesList.filter((m) => !m.pinnedAt);

	unpinned.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

	pinned.sort(
		(a, b) =>
			new Date(a.pinnedAt ?? new Date()).getTime() - new Date(b.pinnedAt ?? new Date()).getTime(),
	);

	return [...pinned, ...unpinned];
};
