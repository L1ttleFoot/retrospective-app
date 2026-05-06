import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';

import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';

import * as Styled from './AdminDashboard.styled';
import {createReaction} from './api';

export const CreateReaction = () => {
	const [reactionData, setReactionData] = useState({id: '', value: ''});

	const {mutate} = useMutation({mutationFn: createReaction});

	const handleReactinData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		setReactionData((prev) => ({...prev, [name]: value}));
	};

	const handleCreate = () => {
		mutate(reactionData);
	};

	return (
		<Styled.CreateWrapper>
			<h3>Создать реакцию</h3>
			<Styled.CreateActions>
				<Input name="id" onChange={handleReactinData} value={reactionData.id} placeholder="id" />
				<Input
					name="value"
					onChange={handleReactinData}
					value={reactionData.value}
					placeholder="value"
				/>
				<Button onClick={handleCreate}>Создать</Button>
			</Styled.CreateActions>
		</Styled.CreateWrapper>
	);
};
