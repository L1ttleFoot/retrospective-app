import {ChartColumn, LogIn, LogOut, Menu, User} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

import {ROUTES} from '@/consts/routes';
import {useModal} from '@/src/shared/hooks/useModal';
import {useAuth} from '@/store/useAuth';
import {theme, useTheme} from '@/store/useTheme';
import {Backdrop} from '@/ui/Backdrop';
import {IconButton} from '@/ui/IconButton';
import {Radio} from '@/ui/Radio';
import {Spacer} from '@/ui/Spacer';

import {SideMenu} from '../SideMenu';
import * as Styled from './AppBar.styled';

export const AppBar = () => {
	const navigate = useNavigate();
	const {logout, userData, isAuth} = useAuth();

	const {open, handleClose, toggleOpen} = useModal();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const handleLogin = () => {
		navigate(ROUTES.LOGIN);
	};

	const handleNavigate = () => {
		navigate(ROUTES.ADMIN);
	};

	const handleNavigateTest = () => {
		navigate(ROUTES.TEST);
	};

	const {currentTheme, changeTheme} = useTheme();

	const username = userData?.username;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		changeTheme(event.target.value as theme);
	};

	const themes = [
		{label: 'Светлая', value: 'light'},
		{label: 'Темная', value: 'dark'},
		//{label: 'Windows 98', value: 'win98'},
	] as const;

	return (
		<>
			<Styled.AppBar>
				{isAuth && (
					<>
						<IconButton size="small" onClick={toggleOpen} color={'#52b788'}>
							<Menu />
						</IconButton>

						<IconButton size="small" onClick={handleNavigate} color={'#52b788'}>
							<User />
						</IconButton>

						<IconButton size="small" onClick={handleNavigateTest} color={'#52b788'}>
							<ChartColumn />
						</IconButton>
					</>
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
					<IconButton size={'small'} onClick={handleLogout} color={'#52b788'}>
						<LogOut />
					</IconButton>
				) : (
					<IconButton size={'small'} onClick={handleLogin} color={'#52b788'}>
						<LogIn />
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
