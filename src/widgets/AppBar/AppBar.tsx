import Menu from '@assets/icons/menu.svg?react';
import {IconButton} from '@ui/IconButton';
import * as Styled from './AppBar.styled';
import {SideMenu} from '../SideMenu';
import {Spacer} from '@ui/Spacer';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '@store/useAuth';
import {Backdrop} from '@ui/Backdrop';
import {useModal} from '@src/shared/hooks/useModal';
import {theme, useTheme} from '@store/useTheme';
import Login from '@assets/icons/login.svg?react';
import Logout from '@assets/icons/logout.svg?react';
import {Radio} from '@ui/Radio';

export const AppBar = () => {
    const navigate = useNavigate();
    const {logout, userData, isAuth} = useAuth();

    const {open, handleClose, toggleOpen} = useModal();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const {currentTheme, changeTheme} = useTheme();

    const username = userData?.username;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTheme(event.target.value as theme);
    };

    const themes = [
        {label: 'Светлая', value: 'light'},
        {label: 'Темная', value: 'dark'},
        {label: 'Windows 98', value: 'win98'},
    ] as const;

    return (
        <>
            <Styled.AppBar>
                {isAuth && (
                    <IconButton size="small" onClick={toggleOpen}>
                        <Menu />
                    </IconButton>
                )}

                <Spacer />

                {isAuth && <div>{username}</div>}

                {themes.map((theme) => (
                    <Radio
                        key={theme.value}
                        value={theme.value}
                        name={'theme'}
                        checked={currentTheme === theme.value}
                        onChange={handleChange}
                        label={theme.label}
                    />
                ))}

                {isAuth ? (
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
