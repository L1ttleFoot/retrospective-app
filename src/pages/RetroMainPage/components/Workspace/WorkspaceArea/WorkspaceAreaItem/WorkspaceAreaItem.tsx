import * as Styled from "./WorkspaceAreaItem.styled";
import {IWorkspaceAreaItem} from "../../../../../../store/useWorkspace";
import {ReactNode} from "react";

interface IWorkspaceItem extends Partial<IWorkspaceAreaItem> {
    type?: string;
    input?: ReactNode
}

export const WorkspaceAreaItem = (props:IWorkspaceItem) => {

    const {text, type, input} = props

    if(type === 'input'){
        return(
            <Styled.WorkspaceItem>
                {input}
            </Styled.WorkspaceItem>
        )
    }

    return(
        <Styled.WorkspaceItem>
            {text}
        </Styled.WorkspaceItem>
    )
}