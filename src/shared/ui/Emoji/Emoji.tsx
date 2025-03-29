import * as Styled from './Emoji.styled';

type EmojiProps = {
    label?: string;
    emoji: string;
    onClick?: () => void;
};

export const Emoji = (props: EmojiProps) => (
    <Styled.Emoji
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ''}
        aria-hidden={props.label ? 'false' : 'true'}
        onClick={props.onClick}
    >
        {props.emoji}
    </Styled.Emoji>
);
