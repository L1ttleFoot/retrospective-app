import Menu from '@assets/icons/menu.svg?react';
import {IconButton} from '@components/IconButton';
import * as Styled from './AppBar.styled';
import {SideMenu} from '../SideMenu';
import {Spacer} from '@components/Spacer';
import {getCurrentUser} from '@utils/getCurrentUser';
import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../../../../initFirebase';
import {useLogin} from '@store/useLogin';
import {Backdrop} from '@components/Backdrop';
import {useModal} from '@hooks/useModal';
import {useTheme} from '@store/useTheme';
import Avatar from '@assets/icons/avatar.svg?react';
import UnknownAvatar from '@assets/icons/unknownAvatar.svg?react';
import Login from '@assets/icons/login.svg?react';
import Logout from '@assets/icons/logout.svg?react';
import {ToggleButton} from '@components/ToggleButton';

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

    const {currentTheme, toggleTheme} = useTheme();

    const nickname = currentUser?.email?.split('@')[0];

    return (
        <>
            <Styled.AppBar>
                {currentUser && (
                    <IconButton size="small" onClick={toggleOpen}>
                        <Menu />
                    </IconButton>
                )}

                <Spacer />

                {currentUser && <div>{nickname}</div>}

                <ToggleButton value={currentTheme === 'ligth'} onToggle={toggleTheme} />

                {currentUser ? (
                    <IconButton onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleLogin}>
                        <Login />
                    </IconButton>
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
