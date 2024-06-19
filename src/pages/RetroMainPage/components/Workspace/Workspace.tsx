import * as Styled from "./Workspace.styled";
import {WorkspaceArea} from "./components/WorkspaceArea";
import {useWorkspace} from "../../../../store/useWorkspace";

export const Workspace = () => {

    const {workspaceList} = useWorkspace()

    const {areas} = workspaceList[0]

    return(
        <Styled.Workspace>
            {areas.map(area => <WorkspaceArea key={area.id} {...area}/>)}
        </Styled.Workspace>
    )
}