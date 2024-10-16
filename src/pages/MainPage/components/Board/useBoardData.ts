import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {useDiscussions} from '../../../../store/useDiscussions';
import {ISection, IMessages} from './BoardSection/BoardSection.types';
import {db} from '../../../../initFirebase';

export const useBoardData = () => {
    const {currentDiscussionId} = useDiscussions();
    const [messagesData, setMessagesData] = useState<IMessages>({});
    const [soundEffect, setSoundEffect] = useState<{sound?: boolean}>({sound: false});

    const getSections = async () => {
        if (!currentDiscussionId) return [];
        const quertySnapshot = await getDoc(doc(db, 'sections', currentDiscussionId));
        return quertySnapshot.data() ?? ([] as ISection[]);
    };

    useEffect(() => {
        if (!currentDiscussionId) return;

        const unsubscribe = onSnapshot(doc(db, 'messages', currentDiscussionId), (snapshot) => {
            const data = snapshot.data() ?? {};
            setMessagesData(
                Object.values(data).reduce((acc, obj) => {
                    if (!acc[obj.sectionIndex]) {
                        acc[obj.sectionIndex] = [];
                    }
                    acc[obj.sectionIndex].push(obj);
                    return acc;
                }, {}),
            );
        });
        return () => unsubscribe();
    }, [currentDiscussionId]);

    const {data: sectionsData} = useQuery({
        queryKey: ['sections', currentDiscussionId],
        queryFn: getSections,
        initialData: [],
    });

    useEffect(() => {
        if (!currentDiscussionId) return;

        const unsubscribe = onSnapshot(
            doc(db, 'discussionsEffects', currentDiscussionId),
            (snapshot) => {
                const data = snapshot.data() ?? {};
                setSoundEffect(data);
            },
        );
        return () => unsubscribe();
    }, [currentDiscussionId]);

    const {mutate: mutateDiscussionsEffects} = useMutation({
        mutationFn: async ({id}: {id: string}) => {
            await updateDoc(doc(db, 'discussionsEffects', id), {sound: !soundEffect.sound});
        },
    });

    return {
        sectionsData: Object.values(sectionsData),
        messagesData,
        soundEffect,
        mutateDiscussionsEffects,
    };
};
