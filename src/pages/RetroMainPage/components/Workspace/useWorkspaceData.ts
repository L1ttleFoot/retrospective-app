import {doc, getDoc} from 'firebase/firestore';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useDiscussions} from '../../../../store/useDiscussions';
import {Area, useAreas} from '../../../../store/useAreas';
import {db} from '../../../../initFirebase';
import {Messages, useMessages} from '../../../../store/useMessages';

export const useWorkspaceData = () => {
    const {currentDiscussionId} = useDiscussions();
    const {setAreasData} = useAreas();
    const {setMessagesData} = useMessages();

    const getAreas = async () => {
        if (!currentDiscussionId) return [];
        const quertySnapshot = await getDoc(doc(db, 'areas', currentDiscussionId));
        return quertySnapshot.data() ?? ([] as Area[]);
    };

    const getMessages = async () => {
        if (!currentDiscussionId) return {};
        const quertySnapshot = await getDoc(doc(db, 'messages', currentDiscussionId));
        return quertySnapshot.data() ?? ({} as Messages);
    };

    const {data: areasData} = useQuery({
        queryKey: ['areas', currentDiscussionId],
        queryFn: getAreas,
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
                    if (!acc[obj.areaIndex]) {
                        acc[obj.areaIndex] = [];
                    }
                    acc[obj.areaIndex].push(obj);
                    return acc;
                }, {}),
            );
    }, [messagesData, currentDiscussionId, setMessagesData]);

    useEffect(() => {
        if (areasData) setAreasData(Object.values(areasData));
    }, [areasData, currentDiscussionId, setAreasData]);
};
