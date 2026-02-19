import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Trash2} from 'lucide-react';

import {IconButton} from '@/ui/IconButton';

import {deleteMessage} from '../../api';
import {Message, Section} from '../../BoardSection.types';

interface DeleteMessageProps {
	messageId: Message['id'];
	sectionId: Section['id'];
}

export const DeleteMessage = ({messageId, sectionId}: DeleteMessageProps) => {
	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationFn: deleteMessage,
		onMutate: (variables) => {
			const {messageId} = variables;

			const previousData = queryClient.getQueryData(['messages', sectionId]) as Message[];

			queryClient.setQueryData(['messages', sectionId], (old: Message[]) =>
				old.filter((message) => message.id !== messageId),
			);

			return {previousData, sectionId};
		},
		onError: (error, _, context) => {
			queryClient.setQueryData(['messages', context?.sectionId], context?.previousData);
			console.error('Failed to delete message:', error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['messages', sectionId]});
		},
	});

	const handleClick = () => {
		if (!messageId) return;
		mutate({messageId});
	};

	return (
		<IconButton onClick={handleClick} size="verySmall" color="white">
			<Trash2 />
		</IconButton>
	);
};
