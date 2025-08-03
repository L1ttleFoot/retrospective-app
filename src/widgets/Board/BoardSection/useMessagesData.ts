import {useQuery} from '@tanstack/react-query';

import {getMessages} from './api';
import {Section} from './BoardSection.types';

export const useMessagesData = (sectionId: Section['id']) => {
	const {data, isFetching} = useQuery({
		queryKey: ['messages', sectionId],
		queryFn: () => getMessages(sectionId),
		initialData: [],
	});

	return {messagesData: data, isFetching};
};
