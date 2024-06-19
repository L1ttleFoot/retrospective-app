import * as Styled from "./WorkspaceArea.styled";
import {IWorkspaceArea, useWorkspace} from "../../../../../../store/useWorkspace";
import {WorkspaceAreaItem} from "../WorkspaceAreaItem";
import {Button} from "../../../../../../components/Button";
import React, {ChangeEvent, useState} from "react";

export const WorkspaceArea = (props: IWorkspaceArea) => {

    const {addItem} = useWorkspace()

    const {title, items, id} = props;

    const [show, setShow] = useState(false);

    const [text, setText] = useState("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addItem(1, id, {id: new Date().getTime(), text, votes: 0})
            setShow(false)
            setText('')
        }
    }

    const handleBlure = () => {
        addItem(1, id, {id: new Date().getTime(), text, votes: 0})
        setShow(false)
        setText('')
    }

    return (
        <Styled.WorkspaceArea>
            <Styled.WorkspaceAreaHeader>{title}
                <Button onClick={() => setShow(true)}>Добавить</Button>
            </Styled.WorkspaceAreaHeader>
            <Styled.WorkspaceAreaBody>{items.map(item => <WorkspaceAreaItem key={item.id} {...item}/>)}
                {/*show && <Styled.Input value={text} onChange={(e)=>hh(e)} onBlur={hhhh} onKeyDown={(e)=>hhh(e)}/>*/}
                {show && <WorkspaceAreaItem type={'input'}
                                            input={<Styled.Input value={text} onChange={(e) => handleChange(e)}
                                                                 onBlur={handleBlure}
                                                                 onKeyDown={(e) => handleEnter(e)}/>}/>}
            </Styled.WorkspaceAreaBody>
        </Styled.WorkspaceArea>
    )
}