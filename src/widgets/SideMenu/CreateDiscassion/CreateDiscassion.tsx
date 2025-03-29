import {useState} from 'react';
import {Input} from '@ui/Input';
import {Button} from '@ui/Button';
import {capitalize} from '@utils/capitalize';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useAuth} from '@store/useAuth';
import {useDiscussions} from '@store/useDiscussions';
import {createDiscussion} from '../api';

export const CreateDiscussion = () => {
    const queryClient = useQueryClient();
    const {setCurrentDiscussionId} = useDiscussions();
    const {userData} = useAuth();

    const [name, setName] = useState('');

    const {mutate: mutateDiscussions} = useMutation({
        mutationFn: createDiscussion,
        onSuccess: ({id}) => {
            setCurrentDiscussionId(id);
            setName('');
            queryClient.invalidateQueries({queryKey: ['discussions']});
        },
    });

    const handleCreate = () => {
        mutateDiscussions({name, ownerId: userData?.id || ''});
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
