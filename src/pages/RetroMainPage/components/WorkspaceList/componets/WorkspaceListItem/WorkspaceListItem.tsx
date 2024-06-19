import React from "react";
import * as Styled from './WorkspaceListItem.styled'
import {Workspace} from "../../../../../../store/useWorkspace";
import {formatDate} from "../../../../../../utils/dateUtils";

interface IWorkspaceItem {
    item: Workspace,
    current?: number,
    deleteItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export const WorkspaceListItem = (props: IWorkspaceItem) => {

    const {item, current, deleteItem} = props

    const isCurrent = item.id === current

    return (
        <Styled.WorkspaceListItem onClick={deleteItem} isCurrent={isCurrent}>
            <Styled.Label>{item.name}</Styled.Label>
            <Styled.Date>{formatDate(item.date)}</Styled.Date>
        </Styled.WorkspaceListItem>
    )
}