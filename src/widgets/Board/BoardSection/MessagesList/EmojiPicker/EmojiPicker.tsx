import {autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react-dom';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPortal} from 'react-dom';

import {useModal} from '@/src/shared/hooks/useModal';
import {Backdrop} from '@/ui/Backdrop';
import {Emoji} from '@/ui/Emoji';

import {addEmoji} from '../../api';
import * as Styled from './EmojiPicker.styled';
import {TEmoji} from './EmojiPicker.types';

type EmojiPickerProps = {
	messageId?: string;
	enabledEmoji: TEmoji[];
	handleActive: (value: string) => void;
};

export const EmojiPicker = ({messageId, enabledEmoji, handleActive}: EmojiPickerProps) => {
	const client = useQueryClient();

	const {open, toggleOpen, handleClose} = useModal();

	const {refs, strategy, x, y} = useFloating({
		placement: 'bottom',
		middleware: [offset(10), flip({padding: 10}), shift({padding: 10})],

		whileElementsMounted: autoUpdate,
	});

	const {mutate} = useMutation({
		mutationKey: ['emoji', messageId],
		mutationFn: async (emoji: TEmoji) => {
			await addEmoji(messageId!, emoji);
			return emoji;
		},
		onSuccess: (value) => {
			client.invalidateQueries({queryKey: ['messages']});
			handleActive(value.id);
		},
	});

	const handleSelectEmoji = (emoji: TEmoji) => {
		mutate(emoji);
		handleClose();
	};

	const modalRoot = document.getElementById('modal-root');

	return (
		<>
			<Styled.OpenSelector onClick={toggleOpen} ref={refs.setReference}>
				+
			</Styled.OpenSelector>
			{open &&
				modalRoot &&
				createPortal(
					<Backdrop onClose={handleClose} isTransparent>
						<Styled.Emojis
							ref={refs.setFloating}
							style={{position: strategy, top: y ?? 0, left: x ?? 0}}
						>
							{enabledEmoji.map((emoji: TEmoji) => (
								<Emoji
									key={emoji.id}
									emoji={emoji.character}
									onClick={() => handleSelectEmoji(emoji)}
								/>
							))}
						</Styled.Emojis>
					</Backdrop>,
					modalRoot,
				)}
		</>
	);
};
