import {useState} from 'react';
import {Input} from '../../../../../components/Input';
import {Button} from '../../../../../components/Button';
import {capitalize} from '../../../../../utils/capitalize';
import {useDiscussions} from '../../../../../store/useDiscussions';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../../../initFirebase';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {v4} from 'uuid';
import {useLogin} from '../../../../../store/useLogin';

export const CreateDiscussion = () => {
    const client = useQueryClient();

    const {setCurrentDiscussionId} = useDiscussions();
    const {userData} = useLogin();

    const [name, setName] = useState('');

    const {mutate: mutateWorkspaces} = useMutation({
        mutationFn: async (id: string) => {
            await setDoc(doc(db, 'workspaces', id), {
                date: new Date().valueOf(),
                discussionId: id,
                areas: [],
            });
        },
    });

    const {mutate: mutateDiscussions} = useMutation({
        mutationFn: async (id: string) => {
            await setDoc(doc(db, 'discussions', id), {
                userUid: userData?.userUid,
                name,
                createdAt: new Date().valueOf(),
            });

            return id;
        },
        onSuccess: (id) => {
            setName('');
            setCurrentDiscussionId(id);
            client.invalidateQueries({queryKey: ['discussions']});
        },
    });

    const handleCreate = async () => {
        const id = v4();
        mutateDiscussions(id);
    };

    return (
        <>
            <Input
                placeholder="Обсуждение"
                value={name}
                onChange={(e) => setName(capitalize(e.target.value))}
            />
            <Button disabled={!name} onClick={handleCreate}>
                Создать
            </Button>
        </>
    );
};
