import * as Styled from './ReactionItem.styled';

type ReactionItemProps = {label?: string; reaction: string; onClick?: () => void};

export const ReactionItem = (props: ReactionItemProps) => (
	<Styled.ReactionItem
		className="reaction"
		role="img"
		aria-label={props.label || undefined}
		aria-hidden={!props.label}
		onClick={props.onClick}
	>
		{props.reaction}
	</Styled.ReactionItem>
);
