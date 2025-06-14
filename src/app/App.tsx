import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import {theme, themePallets} from '../theme';
import {useTheme} from '@store/useTheme';
import ErrorBoundary from '@src/shared/ErrorBoundary/ErrorBoundary';
import {GlobalStyle} from '@src/GlobalStyles';
import {AuthInit} from '@ui/AuthInit';
import {Router} from './Router';
import {useEffect} from 'react';
import {init, initData} from '@telegram-apps/sdk';

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
            console.log('Данные пользователя:', userData);
        } else {
            console.log('Telegram WebApp не инициализирован');
        }
    }, []);

    useEffect(() => {
        try {
            init();
            if (window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();
                const userData = tg.initDataUnsafe?.user;
                console.log('Данные пользователя:', userData);
            }
        } catch (error) {
            console.error('Ошибка инициализации Telegram WebApp:', error);
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
