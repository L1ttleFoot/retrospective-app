import {useState} from "react";
import {Input} from "../../../../components/Input";
import * as Styled from './SideMenu.styled'
import {Button} from "../../../../components/Button";
import {useWorkspace} from "../../../../store/useWorkspace";
import {WorkspaceList} from "../WorkspaceList";
import {capitalize} from "../../../../utils/capitalize";
import {Spacer} from "../../../../components/Spacer";
import {useLogin} from "../../../../store/useLogin";
import {useNavigate} from "react-router-dom";

export const SideMenu = () => {

    const navigate = useNavigate();
    const {addWorkspace} = useWorkspace()
    const {resetUser, isLoggedIn} = useLogin()

    const [name, setName] = useState('')

    const handleClick = () => {
        addWorkspace(name)
        setName('')
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
                    <Button onClick={handleClick}>Добавить</Button>
                    <WorkspaceList/>
                </>
            }
            <Spacer/>
            {isLoggedIn ? <Button onClick={handleLogout}>Выйти</Button> : <Button onClick={handleLogin}>Войти</Button>}
        </Styled.Selector>
    )
}