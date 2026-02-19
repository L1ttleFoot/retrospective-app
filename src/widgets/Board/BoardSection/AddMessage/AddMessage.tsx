import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ChangeEvent, useState} from 'react';

import {createMessage} from '../api';
import {Message} from '../BoardSection.types';
import * as Styled from './AddMessage.styled';

type AddItemType = {sectionId: string; handleShowInput: (value: boolean) => void; color: string};

export const AddMessage = ({sectionId, handleShowInput, color}: AddItemType) => {
	const queryClient = useQueryClient();

	const [text, setText] = useState('');

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const {mutate} = useMutation({
		mutationFn: createMessage,
		onMutate: (variables) => {
			const {text, sectionId} = variables;

			const previousData = queryClient.getQueryData(['messages', sectionId]) as Message[];

			queryClient.setQueryData(['messages', sectionId], (old: Message[]) => [
				...old,
				{text, sectionId, id: 'tempId', emojies: []},
			]);

			return {previousData, sectionId};
		},
		onSuccess: (data) => {
			localStorage.setItem('authorId', data.authorId);
			setText('');
			queryClient.invalidateQueries({queryKey: ['messages', sectionId]});
		},
	});

	const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			if (!text.trim()) {
				handleShowInput(false);
				return;
			}
			const authorId = localStorage.getItem('authorId');
			mutate({text, sectionId, authorId});
			handleShowInput(false);
		}
		if (e.key === 'Escape') {
			handleShowInput(false);
			setText('');
		}
	};

	const handleBlur = () => {
		if (!text.trim()) {
			handleShowInput(false);
			return;
		}

		mutate({text, sectionId});
		handleShowInput(false);
	};

	return (
		<Styled.Wrapper $color={color}>
			<Styled.Input
				autoFocus
				value={text}
				onChange={handleChange}
				onBlur={handleBlur}
				onKeyDown={handleEnter}
			/>

			{/* <Styled.ActionsArea $color={color}>
				<IconButton size="verySmall" color="white">
					<Send />
				</IconButton>
				<IconButton size="verySmall" color="white">
					<X />
				</IconButton>
			</Styled.ActionsArea> */}
		</Styled.Wrapper>
	);
};
