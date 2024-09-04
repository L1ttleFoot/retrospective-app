import * as Styled from './Workspace.styled';
import {WorkspaceArea} from './WorkspaceSection';
import {useLogin} from '../../../../store/useLogin';
import {useDiscussions} from '../../../../store/useDiscussions';
import {useAreas} from '../../../../store/useAreas';
import {useWorkspaceData} from './useWorkspaceData';
import {useMessages} from '../../../../store/useMessages';
import {CreateSections} from './CreateSections';

export const Workspace = () => {
    useWorkspaceData();

    const {isLoggedIn} = useLogin();
    const {currentDiscussionId} = useDiscussions();
    const {areasData} = useAreas();
    const {messagesData} = useMessages();

    if (!isLoggedIn && !currentDiscussionId) {
        return <Styled.EmptyWorkspace>Для продолжения авторизуйтесь</Styled.EmptyWorkspace>;
    }

    if (!currentDiscussionId) {
        return (
            <Styled.EmptyWorkspace>
                Выберите обсуждение из списка или создайте новое
            </Styled.EmptyWorkspace>
        );
    }

    if (!areasData.length) {
        return (
            <Styled.EmptyWorkspace>
                <CreateSections />
            </Styled.EmptyWorkspace>
        );
    }

    return (
        <Styled.Workspace>
            {areasData.map((area, index) => (
                <WorkspaceArea key={area.id} index={index} messages={messagesData} {...area} />
            ))}
        </Styled.Workspace>
    );
};
