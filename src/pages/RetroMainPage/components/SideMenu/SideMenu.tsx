import {useState} from "react";
import {Input} from "../../../../components/Input";
import * as Styled from './SideMenu.styled'
import {Button} from "../../../../components/Button";
import {useWorkspace} from "../../../../store/useWorkspace";
import {capitalize} from "../../../../utils/capitalize";
import {Spacer} from "../../../../components/Spacer";
import {useLogin} from "../../../../store/useLogin";
import {useNavigate} from "react-router-dom";
import { getDatabase, onValue, ref, set} from "firebase/database";
import { useDiscassions } from "../../../../store/useDiscassions";
import { useWorkspaceCreator } from "../../../../store/useWorkspaceCreator";
import { useDiscassionData } from "./DiscassionsList/useDiscassionsData";
import { DiscassionsList } from "./DiscassionsList";
import { v4 } from "uuid";

export const SideMenu = () => {

    useDiscassionData();

    const db = getDatabase();
    const navigate = useNavigate();
    const {resetUser, isLoggedIn} = useLogin();
    const {setWorkspaceData} = useWorkspace();
    const {setDiscassionsData, setCurrentDiscassionId} = useDiscassions();
    const {addtWorkspaceCreatorData} = useWorkspaceCreator();

    const [name, setName] = useState('');

    const handleCreate = () => {

        const id = v4();

        setName('');
        
        const discassionsRef = ref(db, `discassions/`);
        const workspacesRef = ref(db, `workspaces/`);

        set(ref(db, 'discassions/' + id), {
            id: id,
            name: name,
            date: new Date().valueOf(),
        });

        set(ref(db, 'workspaces/' + id), {
            id: id,
            date: new Date().valueOf(),
        });

        onValue(discassionsRef, (snapshot) => {
            if(snapshot.exists()){
                setDiscassionsData(Object.values(snapshot.val()))
            }
            else setDiscassionsData([])
        });

        onValue(workspacesRef, (snapshot) => {
            if(snapshot.exists()){
                setWorkspaceData(Object.values(snapshot.val()))
            }
            else setWorkspaceData([])
        });

        setCurrentDiscassionId(id);
        addtWorkspaceCreatorData(id);
    }

    const handleLogout = () => {
        resetUser();
        navigate('/login')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <Styled.Selector>
            {isLoggedIn &&
                <>
                    <Input placeholder='Обсуждение' value={name} onChange={(e) => setName(capitalize(e.target.value))}/>
                    <Button onClick={handleCreate}>Создать</Button>
                    <DiscassionsList/>
                </>
            }
            <Spacer/>
            {isLoggedIn ? <Button onClick={handleLogout}>Выйти</Button> : <Button onClick={handleLogin}>Войти</Button>}
        </Styled.Selector>
    )
}