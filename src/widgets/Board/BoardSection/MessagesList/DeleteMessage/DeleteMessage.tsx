import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Trash2} from 'lucide-react';

import {useAuth} from '@/store/useAuth';
import {Discussion} from '@/store/useDiscussions';
import {IconButton} from '@/ui/IconButton';

import {deleteMessage} from '../../api';
import {Message, Section} from '../../BoardSection.types';

interface DeleteMessageProps {
	messageId: Message['id'];
	sectionId: Section['id'];
	authorId: Message['authorId'];
	ownerId: Discussion['ownerId'];
}

export const DeleteMessage = ({messageId, sectionId, authorId, ownerId}: DeleteMessageProps) => {
	const queryClient = useQueryClient();

	const {userData} = useAuth();

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

	const isAuthor = authorId === localStorage.getItem('authorId');
	const isOwner = ownerId === userData?.id;

	if (!isAuthor && !isOwner) return null;

	return (
		<IconButton onClick={handleClick} size="verySmall" color="white">
			<Trash2 />
		</IconButton>
	);
};
