import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ChangeEvent, useState} from 'react';

import {updateMessage} from '../../api';
import {Message} from '../../BoardSection.types';
import * as Styled from './EditMessage.styled';

type EditMessageTextAreaProps = {
	text: Message['text'];
	sectionId: Message['sectionId'];
	messageId: Message['id'];
	handleEditField: (value: boolean) => void;
};

export const EditMessageTextArea = ({
	text,
	sectionId,
	messageId,
	handleEditField,
}: EditMessageTextAreaProps) => {
	const [editedText, setEditedText] = useState(text);

	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationFn: updateMessage,
		onMutate: (variables) => {
			const {messageId} = variables;

			const previousData = queryClient.getQueryData(['messages', sectionId]) as Message[];

			queryClient.setQueryData(['messages', sectionId], (old: Message[]) =>
				old.map((message) => (message.id === messageId ? {...message, text: editedText} : message)),
			);

			return {previousData, sectionId};
		},
		onError: (error, _, context) => {
			queryClient.setQueryData(['messages', context?.sectionId], context?.previousData);
			console.error('Failed to delete message:', error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['messages', sectionId]});
		},
	});

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setEditedText(e.target.value);
	};

	const sendMessage = async () => {
		if (!editedText.trim() || editedText === text) {
			setEditedText(text);
			handleEditField(false);
			return;
		}

		mutate({dto: {text: editedText}, messageId});
		handleEditField(false);
	};

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') sendMessage();
	};

	const handleBlur = () => sendMessage();

	return (
		<Styled.TextArea
			autoFocus
			value={editedText}
			onChange={handleChange}
			onBlur={handleBlur}
			onKeyDown={handleEnter}
			onFocus={(e) => {
				const val = e.target.value;
				e.target.value = '';
				e.target.value = val;
			}}
		/>
	);
};
