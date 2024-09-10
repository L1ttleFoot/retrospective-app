import {IDiscussion, useDiscussions} from '../../../../../store/useDiscussions';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import {db} from '../../../../../initFirebase';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useLogin} from '../../../../../store/useLogin';

export const useDiscussionData = () => {
    const {setDiscussionsData} = useDiscussions();
    const {userData} = useLogin();

    const q = query(
        collection(db, 'discussions'),
        where('userUid', '==', userData?.userUid ?? ''),
        orderBy('createdAt', 'desc'),
    );

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
