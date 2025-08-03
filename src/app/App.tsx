import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {GlobalStyle} from '@/src/GlobalStyles';
import ErrorBoundary from '@/src/shared/ErrorBoundary/ErrorBoundary';
import {useTheme} from '@/store/useTheme';
import {AuthInit} from '@/ui/AuthInit';

import {theme, themePallets} from '../theme';
import {Router} from './Router';

const queryClient = new QueryClient({
	defaultOptions: {queries: {refetchOnWindowFocus: false, retry: 0}},
});

export function App() {
	const {currentTheme} = useTheme();

	const themePalette = themePallets[currentTheme];

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			const tg = window.Telegram.WebApp;
			tg.ready();
			const userData = tg.initDataUnsafe?.user;
			console.log('Telegram WebApp инициализирован', tg);
			console.log('Данные пользователя:', userData);
		} else {
			console.log('Telegram WebApp не инициализирован');
		}
	}, []);

	return (
		<ThemeProvider theme={{...theme, ...themePalette, currentTheme}}>
			<QueryClientProvider client={queryClient}>
				<GlobalStyle />
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
