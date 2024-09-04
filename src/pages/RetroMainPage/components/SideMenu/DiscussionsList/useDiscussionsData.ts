import {IDiscussion, useDiscussions} from '../../../../../store/useDiscussions';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '../../../../../initFirebase';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

export const useDiscussionData = () => {
    const {setDiscussionsData} = useDiscussions();

    const q = query(collection(db, 'discussions'), orderBy('date', 'desc'));

    const getDiscussions = async () => {
        const quertySnapshot = await getDocs(q);
        return quertySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}) as IDiscussion);
    };

    const {data: discussionsData} = useQuery({
        queryKey: ['discussions'],
        queryFn: getDiscussions,
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (discussionsData) setDiscussionsData(discussionsData);
    }, [discussionsData, setDiscussionsData]);
};
