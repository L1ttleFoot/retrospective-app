import {IDiscussion} from '../../../../../store/useDiscussions';
import {useLogin} from '../../../../../store/useLogin';
import {useQuery} from '@tanstack/react-query';
import {BASE_URL} from '@src/consts/api';

export const useDiscussionData = () => {
    const {userData} = useLogin();

    const getDiscussions = async (): Promise<IDiscussion[]> => {
        const response = await fetch(`${BASE_URL}/api/discussions`);
        const discussions = response.json();
        return discussions;
    };

    const {data: discussionsData} = useQuery({queryKey: ['discussions'], queryFn: getDiscussions});

    return {
        discussionsData,
    };
};
