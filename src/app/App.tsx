import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from 'react-router-dom';

import ErrorBoundary from '@/src/shared/ErrorBoundary/ErrorBoundary';
import {useTheme} from '@/store/useTheme';
import {AuthInit} from '@/ui/AuthInit';
import {ToastsContainer} from '@/ui/Toast';

import {theme} from '../theme';
import {themes} from '../theme.css';
import {Router} from './Router';
import '@/src/GlobalStyles.css';
import {useEffect} from 'react';
import {ThemeProvider} from 'styled-components';

import {themePallets} from '../theme';

const queryClient = new QueryClient({
	defaultOptions: {queries: {refetchOnWindowFocus: false, retry: 0}},
});

export function App() {
	const {currentTheme} = useTheme();

	const themePalette = themePallets[currentTheme];

	const activeThemeClass = themes[currentTheme] || themes.light;

	/* useEffect(() => {
		if (window.Telegram?.WebApp) {
			const tg = window.Telegram.WebApp;
			tg.ready();
			const userData = tg.initDataUnsafe?.user;
			console.log('Telegram WebApp инициализирован', tg);
			console.log('Данные пользователя:', userData);
		} else {
			console.log('Telegram WebApp не инициализирован');
		}
	}, []); */

	useEffect(() => {
		document.body.classList.remove(themes.light, themes.dark);
		document.body.classList.add(activeThemeClass);
	}, [activeThemeClass]);

	return (
		<ThemeProvider theme={{...theme, ...themePalette, currentTheme}}>
			<QueryClientProvider client={queryClient}>
				<ToastsContainer />
				<ErrorBoundary>
					<BrowserRouter>
						<AuthInit>
							<Router />
						</AuthInit>
					</BrowserRouter>
				</ErrorBoundary>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
