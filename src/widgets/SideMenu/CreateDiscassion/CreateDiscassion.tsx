import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ChangeEvent, useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';

import {useAuth} from '@/store/useAuth';
import {useDiscussions} from '@/store/useDiscussions';
import {Box} from '@/ui/Box';
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
	const [isError, setIsError] = useState(false);

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
		if (!name) {
			setIsError(true);
			return;
		}
		mutateDiscussions({name, ownerId: userData?.id || ''});
	};

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setName(capitalize(e.target.value));
	};

	return (
		<>
			<Box m={'0 0 10px 0'}>
				<Input
					id="board-title"
					placeholder="Название доски"
					value={name}
					onChange={(e) => handlerChange(e)}
					error={isError}
				/>
			</Box>
			<Button onClick={handleCreate} fullWidth>
				Создать доску
			</Button>
		</>
	);
};
