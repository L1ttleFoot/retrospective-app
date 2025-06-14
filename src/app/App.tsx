import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import {theme, themePallets} from '../theme';
import {useTheme} from '@store/useTheme';
import ErrorBoundary from '@src/shared/ErrorBoundary/ErrorBoundary';
import {GlobalStyle} from '@src/GlobalStyles';
import {AuthInit} from '@ui/AuthInit';
import {Router} from './Router';
import {init, retrieveLaunchParams} from '@telegram-apps/sdk';
import {useEffect} from 'react';

const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false, retry: 0}},
});

export function App() {
    const {currentTheme} = useTheme();

    const themePalette = themePallets[currentTheme];

    useEffect(() => {
        init();
    }, []);

    const {initDataRaw, initData} = retrieveLaunchParams();

    console.log('initDataRaw', initDataRaw);
    console.log('initData', initData);
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
