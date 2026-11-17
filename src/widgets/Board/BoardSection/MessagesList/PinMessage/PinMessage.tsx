import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Pin, PinOff} from 'lucide-react';

import {IconButton} from '@/ui/IconButton';

import {pinMessage, unpinMessage} from '../../api';
import {Message} from '../../BoardSection.types';
import {sortMessages} from '../../sortMessages';

type PinMessageProps = {pinnedAt: Date | null; messageId: string; sectionId: string};

export const PinMessage = ({pinnedAt, messageId, sectionId}: PinMessageProps) => {
	const queryClient = useQueryClient();

	const queryKey = ['messages', sectionId];

	const {mutate} = useMutation({
		mutationFn: pinnedAt ? unpinMessage : pinMessage,
		onMutate: () => {
			const previousData = queryClient.getQueryData(queryKey) as {messages: Message[]};

			if (previousData) {
				queryClient.setQueryData(queryKey, (old: {messages: Message[]}) => {
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
		onError: (_err, _vars, ctx) => {
			if (ctx?.previousData) queryClient.setQueryData(queryKey, ctx.previousData);
		},
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: queryKey});
		},
	});

	const handleClick = () => {
		if (!messageId) return;
		mutate({messageId});
	};

	return (
		<IconButton onClick={handleClick} size="verySmall" color="white" aria-label="pin message">
			{pinnedAt ? <PinOff /> : <Pin />}
		</IconButton>
	);
};
