import {useState} from 'react';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import {capitalize} from '../../../../../utils/capitalize';
import {useDiscussions} from '../../../../../store/useDiscussions';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../../../initFirebase';
import {useMutation} from '@tanstack/react-query';
import {v4} from 'uuid';
import {useLogin} from '../../../../../store/useLogin';

export const CreateDiscussion = () => {
    const {setCurrentDiscussionId} = useDiscussions();
    const {userData} = useLogin();

    const [name, setName] = useState('');

    const {mutate: mutateDiscussions} = useMutation({
        mutationFn: async (id: string) => {
            await setDoc(doc(db, 'discussions', id), {
                userUid: userData?.userUid,
                name,
                createdAt: new Date().valueOf(),
            });

            await setDoc(doc(db, 'discussionsEffects', id), {
                sound: null,
            });

            return id;
        },
        onSuccess: (id) => {
            setName('');
            setCurrentDiscussionId(id);
        },
    });

    const handleCreate = async () => {
        const id = v4();
        mutateDiscussions(id);
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
