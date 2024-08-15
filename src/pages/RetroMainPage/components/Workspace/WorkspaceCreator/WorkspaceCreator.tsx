import {Button} from '../../../../../components/Button';
import * as Styled from './WorkspaceCreator.styled';
import {WorkspaceCreatorArea} from './WorkspaceCreatorArea';
import {useWorkspaceCreator} from '../../../../../store/useWorkspaceCreator';
import {getDatabase, ref, update} from 'firebase/database';
import {v4} from 'uuid';
import {useDiscassions} from '../../../../../store/useDiscassions';

export const WorkspaceCreator = () => {
    const db = getDatabase();

    const {currentDiscassionId} = useDiscassions();
    const {workspaceCreatorData, addArea} = useWorkspaceCreator();

    const creatArea = () => {
        if (!currentDiscassionId) return;

        addArea(currentDiscassionId, {id: v4(), title: undefined});
    };

    const current = workspaceCreatorData.find((item) => item.id === currentDiscassionId);

    const handleReady = () => {
        if (!current || !currentDiscassionId) return;
        
        update(ref(db, 'workspaces/' + currentDiscassionId), {areas: current.areas});
    };

    return (
        <Styled.WorkspaceCreator>
            <Styled.WorkspaceCreateField>
                {current?.areas.map((area) => <WorkspaceCreatorArea key={area.id} {...area} />)}
                {(current?.areas?.length ?? 0) < 3 && (
                    <Styled.WorkspaceAddButton>
                        <Button onClick={creatArea}>Добавить поле</Button>
                    </Styled.WorkspaceAddButton>
                )}
            </Styled.WorkspaceCreateField>
            <Styled.WorkspaceCompleteField>
                <Button onClick={handleReady}>Готово</Button>
            </Styled.WorkspaceCompleteField>
        </Styled.WorkspaceCreator>
    );
};
