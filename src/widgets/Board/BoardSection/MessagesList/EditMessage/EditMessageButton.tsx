import {Pencil} from 'lucide-react';

import {IconButton} from '@/ui/IconButton';

interface EditMessageProps {
	handleClick: (value: boolean) => void;
}

export const EditMessage = ({handleClick}: EditMessageProps) => {
	return (
		<IconButton onClick={() => handleClick(true)} size="verySmall" color="white">
			<Pencil />
		</IconButton>
	);
};
