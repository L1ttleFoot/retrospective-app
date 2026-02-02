import {Pencil} from 'lucide-react';

import {useAuth} from '@/store/useAuth';
import {Discussion} from '@/store/useDiscussions';
import {IconButton} from '@/ui/IconButton';

import {Message} from '../../BoardSection.types';

interface EditMessageProps {
	authorId: Message['authorId'];
	ownerId: Discussion['ownerId'];
	handleClick: (value: boolean) => void;
}

export const EditMessage = ({authorId, ownerId, handleClick}: EditMessageProps) => {
	const {userData} = useAuth();

	const isAuthor = authorId === localStorage.getItem('authorId');
	const isOwner = ownerId === userData?.id;

	if (!isAuthor && !isOwner) return null;

	return (
		<IconButton onClick={() => handleClick(true)} size="verySmall" color="white">
			<Pencil />
		</IconButton>
	);
};
