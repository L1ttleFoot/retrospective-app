import {useQuery} from '@tanstack/react-query';

import {useBoards} from '@/store/useBoards';

import {getSections} from './api';

export const useBoardData = () => {
	const {currentBoardId} = useBoards();

	const {data: sectionsData, isFetching} = useQuery({
		queryKey: ['sections', currentBoardId],
		queryFn: () => getSections(currentBoardId),
		initialData: [],
		enabled: !!currentBoardId,
	});

	return {sectionsData, isFetching};
};
