import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';

import {useAuth} from '@/store/useAuth';
import {useDiscussions} from '@/store/useDiscussions';
import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';
import {capitalize} from '@/utils/capitalize';

import {createDiscussion} from '../api';

export const CreateDiscussion = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {setCurrentDiscussionId} = useDiscussions();
	const {userData} = useAuth();

	const [name, setName] = useState('');

	const {mutate: mutateDiscussions} = useMutation({
		mutationFn: createDiscussion,
		onSuccess: ({id}) => {
			setCurrentDiscussionId(id);
			navigate({pathname: '/', search: createSearchParams({id: id ?? ''}).toString()});
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
