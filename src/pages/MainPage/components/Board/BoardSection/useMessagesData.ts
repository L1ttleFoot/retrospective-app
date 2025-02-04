import {BASE_URL} from '@src/consts/api';
import {useQuery} from '@tanstack/react-query';
import {IMessage, ISection} from './BoardSection.types';

export const useMessagesData = (sectionId: ISection['id']) => {
    const getMessages = async (): Promise<IMessage[]> => {
        const response = await fetch(`${BASE_URL}/api/messages/${sectionId}`);

        const messages = await response.json();

        return messages;
    };

    const {data} = useQuery({
        queryKey: ['messages', sectionId],
        queryFn: getMessages,
        initialData: [],
    });

    return {messagesData: data};
};
