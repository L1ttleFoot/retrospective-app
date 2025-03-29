import {useQuery} from '@tanstack/react-query';
import {getByModel} from './api';
import {User, Role, Emoji} from '@src/shared/types/models';

type ModelName = 'user' | 'role' | 'emoji';

export const useAdminDashboard = <T extends ModelName | undefined>({model}: {model: T}) => {
    const {data} = useQuery({
        queryKey: ['getByModel', model],
        queryFn: () => {
            if (!model) {
                return [];
            }
            return getByModel({model});
        },
        initialData: [],
        enabled: !!model,
    });

    return {data};
};
