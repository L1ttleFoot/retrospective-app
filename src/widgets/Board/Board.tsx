import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useAuth} from '@/store/useAuth';
import {useBoards} from '@/store/useBoards';
import {DropContext} from '@/ui/DND/DropContext';
import {ErrorState} from '@/ui/ErrorState';

import {AddSectionsModal} from '../AddSections';
import * as style from './Board.css';
import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {updateMessage} from './BoardSection/api';
import {Message} from './BoardSection/BoardSection.types';
import {sortMessages} from './BoardSection/sortMessages';
import {useBoardData} from './useBoardData';
import {useBoardEvents} from './useBoardEvents';

export const Board = () => {
	const {sectionsData, isFetching, error} = useBoardData();

	const {isAuth} = useAuth();

	const {currentBoardId} = useBoards();

	useBoardEvents(currentBoardId);

	const queryClient = useQueryClient();

	const {mutate} = useMutation({
		mutationKey: ['messages'],
		mutationFn: updateMessage,
		onMutate: async (variables) => {
			const {messageId, dto, sourceSectionId} = variables;

			const previousTargetData = queryClient.getQueryData(['messages', dto.sectionId]) as {
				messages: Message[];
			};

			const previousSourceData = queryClient.getQueryData(['messages', sourceSectionId]) as {
				messages: Message[];
			};

			queryClient.setQueryData(['messages', sourceSectionId], (old: {messages: Message[]}) => {
				if (!old) return old;
				return {messages: old.messages.filter((message) => message.id !== messageId)};
			});

			queryClient.setQueryData(['messages', dto.sectionId], (old: {messages: Message[]}) => {
				const message = previousSourceData?.messages.find((message) => message.id === messageId);
				if (!message) return old;
				const movingMessage = {
					...message,
					sectionId: dto.sectionId ?? message.sectionId,
					updatedAt: new Date(),
					waiting: true,
				};
				return {messages: sortMessages([...(old?.messages ?? []), movingMessage])};
			});

			return {previousSourceData, previousTargetData, sourceSectionId, sectionId: dto.sectionId};
		},
		onError: (_error, _variables, context) => {
			if (!context) return;

			queryClient.setQueryData(['messages', context.sourceSectionId], context.previousSourceData);
			queryClient.setQueryData(
				['messages', context.sectionId],
				context.previousTargetData ?? {messages: []},
			);
		},
		onSuccess: (_, varibles) => {
			queryClient.invalidateQueries({queryKey: ['messages', varibles.sourceSectionId]});
			queryClient.invalidateQueries({queryKey: ['messages', varibles.dto.sectionId]});
		},
	});

	const handleDrop = (messageId: string, targetSectionId: string, sourceSectionId: string) => {
		if (sourceSectionId === targetSectionId) return;

		mutate({messageId, dto: {sectionId: targetSectionId}, sourceSectionId});
	};

	if (!isAuth && !currentBoardId) {
		return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
	}

	if (isAuth && !currentBoardId) {
		return <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>;
	}

	if (error) return <ErrorState error={error} />;

	if (isAuth && !sectionsData.sections.length && !isFetching) {
		return (
			<Styled.EmptyBoard>
				<AddSectionsModal />
			</Styled.EmptyBoard>
		);
	}

	return (
		<DropContext.Provider value={handleDrop}>
			<div className={style.board}>
				<div className={style.title}>{sectionsData.boardTitle}</div>
				<div className={style.sections}>
					{sectionsData.sections.map((section) => (
						<BoardSection key={section.id} {...section} />
					))}
				</div>
			</div>
		</DropContext.Provider>
	);
};
