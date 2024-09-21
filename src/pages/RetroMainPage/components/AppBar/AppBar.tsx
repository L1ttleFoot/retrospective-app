import {useState} from 'react';
import Menu from '../../../../assets/menu';
import {IconButton} from '../../../../components/IconButton';
import * as Styled from './AppBar.styled';
import {SideMenu} from '../SideMenu';
import {Spacer} from '../../../../components/Spacer';
import {Button} from '../../../../components/Button';
import {getCurrentUser} from '../../../../utils/getCurrentUser';
import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../../../../initFirebase';
import {useLogin} from '../../../../store/useLogin';

export const AppBar = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const {resetUser} = useLogin();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        resetUser();
        signOut(auth);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <Styled.AppBar>
                {currentUser && (
                    <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
                        <Menu />
                    </IconButton>
                )}

                <Spacer />
                {currentUser && <div>{currentUser?.email}</div>}
                {currentUser ? (
                    <Button onClick={handleLogout}>Выйти</Button>
                ) : (
                    <Button onClick={handleLogin}>Войти</Button>
                )}
            </Styled.AppBar>

            <SideMenu open={open} />
        </>
    );
};
