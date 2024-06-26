import * as Styled from "./Workspace.styled";
import {WorkspaceArea} from "./WorkspaceArea";
import {useWorkspace} from "../../../../store/useWorkspace";
import { WorkspaceCreator } from "./WorkspaceCreator";
import { useWorkspaceCreator } from "../../../../store/useWorkspaceCreator";
import { Button } from "../../../../components/Button";
import { useLogin } from "../../../../store/useLogin";
import { useDiscassions } from "../../../../store/useDiscassions";

export const Workspace = () => {

    const {isLoggedIn} = useLogin();
    const {currentDiscassionId} = useDiscassions()
    const {workspaceData} = useWorkspace();
    const {workspaceCreatorData, addtWorkspaceCreatorData} = useWorkspaceCreator();

    const currentWorkspace = workspaceData.find(item => item.id === currentDiscassionId)
    const currentCreator = workspaceCreatorData.find(item => item.id === currentDiscassionId)

    if(!isLoggedIn && !currentDiscassionId){
        return(
            <Styled.EmptyWorkspace>
                Для продолжения авторизуйтесь
            </Styled.EmptyWorkspace>
        )
    };

    if(!currentDiscassionId){
        return(
            <Styled.EmptyWorkspace>
                Выберите обсуждение из списка или создайте новое
            </Styled.EmptyWorkspace>
        )
    };

    if(currentDiscassionId && !(currentCreator || currentWorkspace?.areas)){
        return(
            <Styled.EmptyWorkspace>
                <Button onClick={()=>addtWorkspaceCreatorData(currentDiscassionId)}>Создайте рабочее поле</Button>
            </Styled.EmptyWorkspace>
        )
    };

    if(!currentWorkspace?.areas){
        return(
            <Styled.Workspace>
                <WorkspaceCreator/>
            </Styled.Workspace>
        )
    }

    const {areas} = currentWorkspace
    
    return(
        <Styled.Workspace>
            {areas.map((area, index) => <WorkspaceArea key={area.id} {...area} numberId = {index}/>)}
        </Styled.Workspace>
    )
}