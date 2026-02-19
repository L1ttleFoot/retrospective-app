import {useQuery} from '@tanstack/react-query';

import {getTemplates} from '../api';

export const useSectionsTemplatesData = () => {
	const {data: templatesData, isFetching} = useQuery({
		queryKey: ['templates'],
		queryFn: () => getTemplates(),
		initialData: [],
	});

	return {templatesData, isFetching};
};
