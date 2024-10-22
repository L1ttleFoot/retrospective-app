import {CurrentEmojis} from '../CurrentEmojis';
import {DeleteMessage} from '../DeleteMessage';
import {EmojiPicker} from '../EmojiPicker';
import {emojiList} from '../EmojiPicker/EmojiPicker.consts';
import * as Styled from './Message.styled';
import {ReactNode, useEffect, useState} from 'react';

export interface IBoardSection {
    id: string;
    sectionId: string;
    sectionIndex: number;
    text: string;
    votes: number;
    color: string;
    emoji: Record<string, number>;
}

interface IBoardItem extends Partial<IBoardSection> {
    input?: ReactNode;
}

export const Message = (props: IBoardItem) => {
    const {id, text, input, color, emoji} = props;

    const [enabledEmoji, setEnabledEmoji] = useState<string[]>([]);

    const [active, setActive] = useState<string[]>([]);

    const handleActive = (current: string) => {
        setActive((prev) => {
            if (prev.includes(current)) {
                return prev.filter((i) => i !== current);
            } else {
                return [...prev, current];
            }
        });
    };

    const removeActive = (current: string) => {
        setActive((prev) => prev.filter((i) => i !== current));
    };

    const emojiKeys =
        emoji &&
        Object.entries(emoji)
            .filter((item) => item[1] > 0)
            .map((item) => item[0]);

    useEffect(() => {
        setEnabledEmoji(emojiList.filter((item) => !emojiKeys?.includes(item)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emoji]);

    if (!!input) {
        return (
            <Styled.Message $color={color} $input={!!input}>
                {input}
            </Styled.Message>
        );
    }

    return (
        <Styled.Message $color={color}>
            <Styled.MessageText>{text}</Styled.MessageText>
            <DeleteMessage id={id} />
            <Styled.MessageBottom>
                {emoji && (
                    <CurrentEmojis
                        id={id}
                        emoji={emoji}
                        active={active}
                        handleActive={handleActive}
                        removeActive={removeActive}
                        color={color}
                    />
                )}
                {!!enabledEmoji.length && (
                    <EmojiPicker id={id} enabledEmoji={enabledEmoji} handleActive={handleActive} />
                )}
            </Styled.MessageBottom>
        </Styled.Message>
    );
};
