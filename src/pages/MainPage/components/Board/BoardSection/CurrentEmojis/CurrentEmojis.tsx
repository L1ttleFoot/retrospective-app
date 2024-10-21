import {useMutation, useQueryClient} from '@tanstack/react-query';
import * as Styled from './CurrentEmojis.styled';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../../../initFirebase';
import {useDiscussions} from '@store/useDiscussions';
import {useDebounce} from '@hooks/useDebounce';

type CurrentEmojisProps = {
    id?: string;
    emoji?: Record<string, number>;
    active: string[];
    handleActive: (value: string) => void;
    removeActive: (value: string) => void;
};

export const CurrentEmojis = ({
    id,
    emoji,
    active,
    handleActive,
    removeActive,
}: CurrentEmojisProps) => {
    const client = useQueryClient();
    const {currentDiscussionId} = useDiscussions();

    const {mutate} = useMutation({
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
    });

    const handleClickEmoji = (key: string, value: number) => {
        const isSelected = active.includes(key);

        mutate({emoji: key, count: value, action: isSelected ? -1 : 1});
    };

    const debouncedChange = useDebounce(handleClickEmoji, 300);

    return (
        <>
            {emoji &&
                Object.entries(emoji)
                    .filter((item) => item[1] > 0)
                    .sort((a, b) => b[0].localeCompare(a[0]))
                    .sort((a, b) => b[1] - a[1])
                    .map(([key, value]) => (
                        <Styled.CurrentEmojis
                            key={key}
                            onClick={() => debouncedChange(key, value)}
                            $selected={active.includes(key)}
                        >
                            {key}
                            {value}
                        </Styled.CurrentEmojis>
                    ))}
        </>
    );
};
