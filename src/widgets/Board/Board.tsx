import * as Styled from './Board.styled';
import {BoardSection} from './BoardSection';
import {useDiscussions} from '@store/useDiscussions';
import {useBoardData} from './useBoardData';
import {CreateSections} from './CreateSections';
import {useAuth} from '@store/useAuth';
import {DragDropContext, DraggableChildrenFn, Droppable, DropResult} from '@hello-pangea/dnd';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateMessage} from './BoardSection/api';
import {Message} from './BoardSection/BoardSection.types';

export const Board = () => {
    const queryClient = useQueryClient();

    const {sectionsData, isFetching} = useBoardData();

    const {isAuth} = useAuth();

    const {currentDiscussionId} = useDiscussions();

    const {mutate} = useMutation({
        mutationKey: ['messages'],
        mutationFn: updateMessage,
        onMutate: async (variables) => {
            const {messageId, sectionId, sourceSectionId} = variables;

            const previousTargetData = queryClient.getQueryData([
                'messages',
                sectionId,
            ]) as Message[];
            const previousSourceData = queryClient.getQueryData([
                'messages',
                sourceSectionId,
            ]) as Message[];

            queryClient.setQueryData(['messages', sourceSectionId], (old: Message[]) =>
                old.filter((message) => message.id !== messageId),
            );

            queryClient.setQueryData(['messages', sectionId], (old: Message[]) => {
                const message = previousSourceData.find((message) => message.id === messageId);
                if (!old) return [message];
                return [...old, message];
            });

            return {previousSourceData, previousTargetData, sourceSectionId, sectionId};
        },
        onSuccess: (_, varibles) => {
            queryClient.invalidateQueries({queryKey: ['messages', varibles.sourceSectionId]});
            queryClient.invalidateQueries({queryKey: ['messages', varibles.sectionId]});
        },
    });

    const onDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;

        if (!destination || source.droppableId === destination.droppableId) {
            return;
        }

        mutate({
            messageId: draggableId,
            sectionId: destination.droppableId,
            sourceSectionId: source.droppableId,
        });
    };

    /* const getRenderItem = (items) => (provided, snapshot, rubric) => {
        const item = items[rubric.source.index];
        return (
            <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={provided.draggableProps.style}
                className={snapshot.isDragging ? 'dragging' : ''}
            >
                {item.content}
            </li>
        );
    }; */

    if (!isAuth && !currentDiscussionId) {
        return <Styled.EmptyBoard>Для продолжения авторизуйтесь</Styled.EmptyBoard>;
    }

    if (isAuth && !currentDiscussionId) {
        return (
            <Styled.EmptyBoard>Выберите обсуждение из списка или создайте новое</Styled.EmptyBoard>
        );
    }

    if (isAuth && !sectionsData.length && !isFetching) {
        return (
            <Styled.EmptyBoard>
                <CreateSections />
            </Styled.EmptyBoard>
        );
    }

    return (
        <Styled.Board>
            <DragDropContext onDragEnd={onDragEnd}>
                {sectionsData.map((section) => (
                    <BoardSection key={section.id} {...section} />
                ))}
            </DragDropContext>
        </Styled.Board>
    );
};
