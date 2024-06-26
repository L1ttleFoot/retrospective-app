import { ChangeEvent, useState } from 'react';
import * as Styled from './WorkspaceCreatorArea.sty;ed'
import { IWorkspaceArea, useWorkspaceCreator } from '../../../../../../store/useWorkspaceCreator';
import { useDiscassions } from '../../../../../../store/useDiscassions';

export const WorkspaceCreatorArea = ({id, title}: IWorkspaceArea) => {

    const { currentDiscassionId } = useDiscassions();
    const { addItem } = useWorkspaceCreator();

    const [text, setText] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentDiscassionId && text) {
            addItem(currentDiscassionId,id, text)
            setText('')
        }
    };

    /* const handleBlure = () => {
        if (currentWorkspaceId) {
            //addItem(currentWorkspace, id, {id: new Date().getTime(), text, votes: 0})
        }
        setShow(text ? false : true)
        setText('')
    } */

    return (
        <Styled.Area>
            <Styled.AreaHeader>

                {title && <Styled.AreaHeaderTitle>{title}</Styled.AreaHeaderTitle>}

                {!title && 
                <Styled.AreaHeaderInput 
                value={text} 
                onChange={handleChange} 
                //onBlur={handleBlure} 
                onKeyDown={(e) => handleEnter(e)} 
                />}
            </Styled.AreaHeader>
        </Styled.Area>
    )
};