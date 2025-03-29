import {useMutation, useQueryClient} from '@tanstack/react-query';
import * as Styled from './CurrentEmojis.styled';
import {useDebounce} from '@src/shared/hooks/useDebounce';
import {TEmoji} from '../EmojiPicker/EmojiPicker.types';

type CurrentEmojisProps = {
    messageId?: string;
    emoji?: {count: number; emoji: TEmoji}[];
    active: string[];
    color?: string;
    handleActive: (value: string) => void;
    removeActive: (value: string) => void;
};

export const CurrentEmojis = ({
    messageId,
    emoji,
    active,
    color,
    handleActive,
    removeActive,
}: CurrentEmojisProps) => {
    const client = useQueryClient();

    /* const {mutate} = useMutation({
        mutationKey: ['addEmoji', id, currentDiscussionId],
        mutationFn: async ({
            emoji,
            count,
            action,
        }: {
            emoji: string;
            count: number;
            action: number;
        }) => {
            await updateDoc(doc(db, 'messages', currentDiscussionId!), {
                [`${id}.emoji.${emoji}`]: count + action || null,
            });
            if (count + action > 0) {
                handleActive(emoji);
            } else removeActive(emoji);
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ['messages']});
        },
    }); */

    const test = (emoji: TEmoji, count: number) => {
        handleActive(emoji.id);
    };

    const handleClickEmoji = (key: string, value: number) => {
        const isSelected = active.includes(key);

        //mutate({emoji: key, count: value, action: isSelected ? -1 : 1});
    };

    return (
        <>
            {emoji &&
                emoji.map(({emoji, count}) => (
                    <Styled.CurrentEmojis
                        key={emoji.id}
                        onClick={() => test(emoji, count)}
                        $selected={active.includes(emoji.id)}
                        $color={color}
                    >
                        {emoji.character}
                        {count}
                    </Styled.CurrentEmojis>
                ))}
        </>
    );
};
