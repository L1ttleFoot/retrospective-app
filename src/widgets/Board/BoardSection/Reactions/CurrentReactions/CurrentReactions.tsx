import {Reaction} from '@/src/shared/types/models';

import {UserReaction} from '../../BoardSection.types';
import {useMessageReactions} from '../hooks/useMessageReactions';
import * as Styled from './CurrentReactions.styled';

type CurrentReactionsProps = {
	messageId: string;
	sectionId: string;
	reactions: UserReaction[];
	color?: string;
};

export const CurrentReactions = ({
	messageId,
	sectionId,
	reactions,
	color,
}: CurrentReactionsProps) => {
	const {mutate} = useMessageReactions(messageId, sectionId);

	const handleClickReaction = (isSelected: boolean, reaction: Reaction) => {
		mutate({isSelected, reaction});
	};

	return (
		<>
			{reactions.map(({name, char, count, isSelected}) => (
				<Styled.CurrentReactions
					key={char}
					onClick={() => handleClickReaction(isSelected, {name, char})}
					$isSelected={isSelected}
					$color={color}
					$isMoreThenOne={count > 1}
				>
					<Styled.ReactionValue>{char}</Styled.ReactionValue>
					{count > 1 && <Styled.ReactionCount>{count}</Styled.ReactionCount>}
				</Styled.CurrentReactions>
			))}
		</>
	);
};
