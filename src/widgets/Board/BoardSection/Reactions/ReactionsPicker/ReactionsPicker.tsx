import {autoUpdate, flip, offset, shift, useFloating} from '@floating-ui/react-dom';
import {Smile} from 'lucide-react';

import {useModal} from '@/src/shared/hooks/useModal';
import {Reaction} from '@/src/shared/types/models';
import {Backdrop} from '@/ui/Backdrop';
import {IconButton} from '@/ui/IconButton';
import {Portal} from '@/ui/Portal';
import {ReactionItem} from '@/ui/ReactionItem';

import {UserReaction} from '../../BoardSection.types';
import {useMessageReactions} from '../hooks/useMessageReactions';
import * as Styled from './ReactionsPicker.styled';

type ReactionPickerProps = {
	messageId: string;
	sectionId: string;
	enabledReactions: readonly Reaction[];
	reactions: UserReaction[];
};

export const ReactionsPicker = ({
	messageId,
	sectionId,
	enabledReactions,
	reactions,
}: ReactionPickerProps) => {
	const activeReactions = reactions.reduce<string[]>((acc, curr) => {
		if (curr.isSelected) {
			acc.push(curr.id);
		}

		return acc;
	}, []);

	const {open, toggleOpen, handleClose} = useModal();

	const {refs, strategy, x, y} = useFloating({
		placement: 'bottom',
		middleware: [offset({mainAxis: 15, crossAxis: 35}), flip({padding: 10}), shift({padding: 10})],
		whileElementsMounted: autoUpdate,
	});

	const {mutate} = useMessageReactions(messageId, sectionId);

	const handleSelectReaction = (reaction: Reaction, isSelected: boolean) => {
		mutate({reaction, isSelected});
		handleClose();
	};

	return (
		<>
			<IconButton size="verySmall" onClick={toggleOpen} ref={refs.setReference}>
				<Smile />
			</IconButton>

			{open && (
				<Portal>
					<Backdrop onClose={handleClose} isTransparent>
						<Styled.Reactions
							ref={refs.setFloating}
							style={{position: strategy, top: y ?? 0, left: x ?? 0}}
						>
							{enabledReactions.map((reaction: Reaction) => (
								<ReactionItem
									key={reaction.id}
									reaction={reaction.value}
									onClick={() =>
										handleSelectReaction(reaction, activeReactions.includes(reaction.id))
									}
								/>
							))}
						</Styled.Reactions>
					</Backdrop>
				</Portal>
			)}
		</>
	);
};
