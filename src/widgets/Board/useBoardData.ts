import {useQuery} from '@tanstack/react-query';
import {useDiscussions} from '@store/useDiscussions';
import {getSections} from './api';

export const useBoardData = () => {
    const {currentDiscussionId} = useDiscussions();

    const {data: sectionsData, isFetching} = useQuery({
        queryKey: ['sections', currentDiscussionId],
        queryFn: () => getSections(currentDiscussionId),
        initialData: [],
        enabled: !!currentDiscussionId,
    });

    return {
        sectionsData,
        isFetching,
    };
};
