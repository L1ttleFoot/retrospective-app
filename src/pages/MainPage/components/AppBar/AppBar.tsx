import Menu from '@assets/icons/menu.svg?react';
import {IconButton} from '@components/IconButton';
import * as Styled from './AppBar.styled';
import {SideMenu} from '../SideMenu';
import {Spacer} from '@components/Spacer';
import {Button} from '@components/Button';
import {getCurrentUser} from '@utils/getCurrentUser';
import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../../../../initFirebase';
import {useLogin} from '@store/useLogin';
import {Backdrop} from '@components/Backdrop';
import {useModal} from '@hooks/useModal';

export const AppBar = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const {resetUser} = useLogin();

    const {open, handleClose, toggleOpen} = useModal();

    const handleLogout = () => {
        resetUser();
        signOut(auth);
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <Styled.AppBar>
                {currentUser && (
                    <IconButton size="small" onClick={toggleOpen}>
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

            {open && (
                <Backdrop onClose={handleClose} isTransparent>
                    <></>
                </Backdrop>
            )}
            <SideMenu open={open} />
        </>
    );
};
