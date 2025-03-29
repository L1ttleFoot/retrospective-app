import {useQuery} from '@tanstack/react-query';
import {Section} from './BoardSection.types';
import {getMessages} from './api';

export const useMessagesData = (sectionId: Section['id']) => {
    const {data, isFetching} = useQuery({
        queryKey: ['messages', sectionId],
        queryFn: () => getMessages(sectionId),
        initialData: [],
    });

    return {messagesData: data, isFetching};
};
