import {useWorkspace} from "../../../../store/useWorkspace";
import * as Styled from './WorkspaceList.styled'
import {WorkspaceListItem} from "./componets/WorkspaceListItem";

export const WorkspaceList = () => {

    const {workspaceList, deleteWorkspace, currentWorkspace} = useWorkspace();

    return(
        <Styled.WorkspaceList>
            {workspaceList.map((item) => <WorkspaceListItem key={item.id} current={currentWorkspace} deleteItem={()=>deleteWorkspace(item.id)} item={item}/>)}
        </Styled.WorkspaceList>
    )
}