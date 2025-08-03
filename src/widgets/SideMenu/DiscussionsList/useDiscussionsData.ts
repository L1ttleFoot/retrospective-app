import {useQuery} from '@tanstack/react-query';

import {getDiscussions} from '../api';

export const useDiscussionData = () => {
	const {data: discussionsData} = useQuery({queryKey: ['discussions'], queryFn: getDiscussions});

	return {discussionsData};
};
