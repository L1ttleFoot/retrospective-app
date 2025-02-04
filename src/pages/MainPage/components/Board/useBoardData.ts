import {useQuery} from '@tanstack/react-query';
import {useDiscussions} from '../../../../store/useDiscussions';
import {ISection} from './BoardSection/BoardSection.types';
import {BASE_URL} from '@src/consts/api';

export const useBoardData = () => {
    const {currentDiscussionId} = useDiscussions();

    const getSections = async (): Promise<ISection[]> => {
        if (!currentDiscussionId) return [];

        const response = await fetch(`${BASE_URL}/api/sections/${currentDiscussionId}`, {
            method: 'GET',
        });
        const sections = await response.json();
        return sections;
    };

    const {data: sectionsData} = useQuery({
        queryKey: ['sections', currentDiscussionId],
        queryFn: getSections,
        initialData: [],
    });

    return {
        sectionsData: Object.values(sectionsData),
    };
};
