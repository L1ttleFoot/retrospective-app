import * as Styled from './WorkspaceArea.styled';
import {IWorkspaceArea, useWorkspace} from '../../../../../store/useWorkspace';
import {WorkspaceAreaItem} from './WorkspaceAreaItem';
import React, {ChangeEvent, useState} from 'react';
import {v4} from 'uuid';
import Add from '../../../../../assets/add';
import {IconButton} from '../../../../../components/IconButton';
import {getDatabase, ref, update} from 'firebase/database';
import {useDiscassions} from '../../../../../store/useDiscassions';

export const WorkspaceArea = (props: IWorkspaceArea & {numberId: number}) => {
    const db = getDatabase();

    const {currentDiscassionId} = useDiscassions();

    const {addItem} = useWorkspace();

    const {title, items, id, numberId} = props;

    const [show, setShow] = useState(false);

    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && currentDiscassionId) {
            addItem(currentDiscassionId, id, {id: v4(), text, votes: 0});
            //update(ref(db, 'workspaces/' + currentDiscassionId), {areas: workspaceData.find(item => item.id === currentDiscassionId)?.areas});
            update(
                ref(
                    db,
                    'workspaces/' +
                        currentDiscassionId +
                        '/areas/' +
                        numberId +
                        `/items/${items?.length ?? 0}`,
                ),
                {id: v4(), text, votes: 0},
            );

            setShow(false);
            setText('');
        }
    };

    const handleBlur = () => {
        if (currentDiscassionId) {
            addItem(currentDiscassionId, id, {id: v4(), text, votes: 0});
            //update(ref(db, 'workspaces/' + currentDiscassionId), {areas: workspaceData.find(item => item.id === currentDiscassionId)?.areas});
            update(
                ref(
                    db,
                    'workspaces/' +
                        currentDiscassionId +
                        '/areas/' +
                        numberId +
                        `/items/${items?.length ?? 0}`,
                ),
                {id: v4(), text, votes: 0},
            );
        }
        setShow(false);
        setText('');
    };

    return (
        <Styled.WorkspaceArea>
            <Styled.WorkspaceAreaHeader>
                {title}
                <IconButton onClick={() => setShow(true)}>
                    <Add />
                </IconButton>
            </Styled.WorkspaceAreaHeader>
            <Styled.WorkspaceAreaBody>
                {items?.map((item) => <WorkspaceAreaItem key={item.id} {...item} />)}
                {show && (
                    <WorkspaceAreaItem
                        type={'input'}
                        input={
                            <Styled.Input
                                value={text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={handleEnter}
                            />
                        }
                    />
                )}
            </Styled.WorkspaceAreaBody>
        </Styled.WorkspaceArea>
    );
};
