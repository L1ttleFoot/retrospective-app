import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Pin, PinOff} from 'lucide-react';

import {IconButton} from '@/ui/IconButton';

import {pinMessage, unpinMessage} from '../../api';
import {Message} from '../../BoardSection.types';

type PinMessageProps = {pinnedAt: Date | null; messageId: string; sectionId: string};

const sortMessages = (messagesList: Message[]) => {
	const pinned = messagesList.filter((m) => m.pinnedAt);
	const unpinned = messagesList.filter((m) => !m.pinnedAt);

	unpinned.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

	pinned.sort(
		(a, b) =>
			new Date(a.pinnedAt ?? new Date()).getTime() - new Date(b.pinnedAt ?? new Date()).getTime(),
	);

	return [...pinned, ...unpinned];
};

export const PinMessage = ({pinnedAt, messageId, sectionId}: PinMessageProps) => {
	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationFn: pinnedAt ? unpinMessage : pinMessage,
		onMutate: () => {
			const previousData = queryClient.getQueryData(['messages', sectionId]) as {
				messages: Message[];
			};

			if (previousData) {
				queryClient.setQueryData(['messages', sectionId], (old: {messages: Message[]}) => {
					const updatedData = old.messages.map((m) => {
						if (m.id === messageId) {
							return {...m, pinnedAt: pinnedAt ? null : new Date()};
						}
						return m;
					});

					return {messages: sortMessages(updatedData)};
				});
			}

			return {previousData};
		},
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['messages', sectionId]});
		},
	});

	const handleClick = () => {
		if (!messageId) return;
		mutate({messageId});
	};

	return (
		<IconButton onClick={handleClick} size="verySmall" color="white" aria-label="delete message">
			{pinnedAt ? <PinOff /> : <Pin />}
		</IconButton>
	);
};
