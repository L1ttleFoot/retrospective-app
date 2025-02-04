import {useState} from 'react';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import {capitalize} from '../../../../../utils/capitalize';
import {IDiscussion, useDiscussions} from '../../../../../store/useDiscussions';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useLogin} from '../../../../../store/useLogin';
import {BASE_URL} from '@src/consts/api';

export const CreateDiscussion = () => {
    const queryClient = useQueryClient();
    const {setCurrentDiscussionId} = useDiscussions();
    const {userData} = useLogin();

    const [name, setName] = useState('');

    const createPost = async (name: IDiscussion['name']): Promise<IDiscussion> => {
        const response = await fetch(`${BASE_URL}/api/discussions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
        });

        return response.json();
    };

    const {mutate: mutateDiscussions} = useMutation({
        mutationFn: createPost,
        onSuccess: ({id}) => {
            setCurrentDiscussionId(id);
            setName('');
            queryClient.invalidateQueries({queryKey: ['discussions']});
        },
    });

    const handleCreate = () => {
        mutateDiscussions(name);
    };

    return (
        <>
            <Input
                placeholder="Обсуждение..."
                value={name}
                onChange={(e) => setName(capitalize(e.target.value))}
            />
            <Button disabled={!name} onClick={handleCreate} fullWidth>
                Создать
            </Button>
        </>
    );
};
