import {useQuery} from '@tanstack/react-query';

import {getBoards} from '../api';

export const useBoardData = () => {
	const {data: boardsData} = useQuery({queryKey: ['boards'], queryFn: getBoards});

	return {boardsData};
};
