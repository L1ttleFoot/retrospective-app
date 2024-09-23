import {doc, getDoc} from 'firebase/firestore';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useDiscussions} from '../../../../store/useDiscussions';
import {ISection, useSections} from '../../../../store/useSections';
import {db} from '../../../../initFirebase';
import {Messages, useMessages} from '../../../../store/useMessages';

export const useBoardData = () => {
    const {currentDiscussionId} = useDiscussions();
    const {setSectionsData} = useSections();
    const {setMessagesData} = useMessages();

    const getSections = async () => {
        if (!currentDiscussionId) return [];
        const quertySnapshot = await getDoc(doc(db, 'sections', currentDiscussionId));
        return quertySnapshot.data() ?? ([] as ISection[]);
    };

    const getMessages = async () => {
        if (!currentDiscussionId) return {};
        const quertySnapshot = await getDoc(doc(db, 'messages', currentDiscussionId));
        return quertySnapshot.data() ?? ({} as Messages);
    };

    const {data: sectionsData} = useQuery({
        queryKey: ['sections', currentDiscussionId],
        queryFn: getSections,
        initialData: [],
    });

    const {data: messagesData} = useQuery({
        queryKey: ['messages', currentDiscussionId],
        queryFn: getMessages,
        initialData: {},
    });

    useEffect(() => {
        if (messagesData)
            setMessagesData(
                Object.values(messagesData).reduce((acc, obj) => {
                    if (!acc[obj.sectionIndex]) {
                        acc[obj.sectionIndex] = [];
                    }
                    acc[obj.sectionIndex].push(obj);
                    return acc;
                }, {}),
            );
    }, [messagesData, currentDiscussionId, setMessagesData]);

    useEffect(() => {
        if (sectionsData) setSectionsData(Object.values(sectionsData));
    }, [sectionsData, currentDiscussionId, setSectionsData]);
};
