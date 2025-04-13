import {CurrentEmojis} from '../CurrentEmojis';
import {DeleteMessage} from './../DeleteMessage';
import {EmojiPicker} from '../EmojiPicker';
import {emojiList} from '../EmojiPicker/EmojiPicker.consts';
import * as Styled from './MessageItem.styled';
import {useEffect, useState} from 'react';
import {TEmoji} from '../EmojiPicker/EmojiPicker.types';
import {Message, Section} from '../../BoardSection.types';
import {Discussion} from '@store/useDiscussions';

export interface BoardSection {
    id: Message['id'];
    sectionId: Section['id'];
    text: Message['text'];
    color: Message['color'];
    isBeingDragged?: boolean;
    emojies: Message['emojies'];
    authorId: Message['authorId'];
    ownerId: Discussion['ownerId'];
}

export const MessageItem = (props: BoardSection) => {
    const {id, text, color, emojies, sectionId, authorId, ownerId, isBeingDragged} = props;

    const [enabledEmoji, setEnabledEmoji] = useState<TEmoji[]>([]);

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

    const emojiKeys = emojies && emojies.map((emoji) => emoji.emoji.id);

    useEffect(() => {
        setEnabledEmoji(emojiList.filter((item) => !emojiKeys.includes(item.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emojies]);

    return (
        <Styled.MessageItem $color={color} $isBeingDragged={isBeingDragged}>
            <Styled.MessageItemText>{text}</Styled.MessageItemText>
            <DeleteMessage messageId={id} sectionId={sectionId} authorId={authorId} ownerId={ownerId} />
            {false && (
                <Styled.MessageItemBottom>
                    {emojies && (
                        <CurrentEmojis
                            messageId={id}
                            emoji={emojies}
                            active={active}
                            handleActive={handleActive}
                            removeActive={removeActive}
                            color={color}
                        />
                    )}
                    {!!enabledEmoji.length && (
                        <EmojiPicker messageId={id} enabledEmoji={enabledEmoji} handleActive={handleActive} />
                    )}
                </Styled.MessageItemBottom>
            )}
        </Styled.MessageItem>
    );
};
