import {Pencil} from 'lucide-react';

import {IconButton} from '@/ui/IconButton';

type EditMessageProps = {handleClick: (value: boolean) => void};

export const EditMessage = ({handleClick}: EditMessageProps) => {
	return (
		<IconButton
			onClick={() => handleClick(true)}
			size="verySmall"
			color="white"
			aria-label="edit message"
		>
			<Pencil />
		</IconButton>
	);
};
