import {IDiscussion} from '../../../../../store/useDiscussions';
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore';
import {db} from '../../../../../initFirebase';
import {useLogin} from '../../../../../store/useLogin';
import {useEffect, useState} from 'react';

export const useDiscussionData = () => {
    const {userData} = useLogin();
    const [discussionsData, setDiscussionsData] = useState<IDiscussion[]>([]);

    useEffect(() => {
        const q = query(
            collection(db, 'discussions'),
            where('userUid', '==', userData?.userUid ?? ''),
            orderBy('createdAt', 'desc'),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}) as IDiscussion);
            setDiscussionsData(data);
        });
        return () => unsubscribe();
    }, [userData?.userUid]);

    return {
        discussionsData,
    };
};
