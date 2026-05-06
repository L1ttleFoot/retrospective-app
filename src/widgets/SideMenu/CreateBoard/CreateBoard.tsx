import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ChangeEvent, useState} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';

import {useAuth} from '@/store/useAuth';
import {useBoards} from '@/store/useBoards';
import {Box} from '@/ui/Box';
import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';
import {capitalize} from '@/utils/capitalize';

import {createBoard} from '../api';

export const CreateBoard = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {setCurrentBoardId} = useBoards();
	const {userData} = useAuth();

	const [title, setTitle] = useState('');
	const [isError, setIsError] = useState(false);

	const {mutate: mutateBoards} = useMutation({
		mutationFn: createBoard,
		onSuccess: ({id}) => {
			setCurrentBoardId(id);
			navigate({pathname: '/', search: createSearchParams({id: id ?? ''}).toString()});
			setTitle('');
			queryClient.invalidateQueries({queryKey: ['boards']});
		},
	});

	const handleCreate = () => {
		if (!title) {
			setIsError(true);
			return;
		}
		mutateBoards({title, ownerId: userData?.id || ''});
	};

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setTitle(capitalize(e.target.value));
	};

	return (
		<>
			<Box m={'0 0 10px 0'}>
				<Input
					id="board-title"
					placeholder="Название доски"
					value={title}
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
