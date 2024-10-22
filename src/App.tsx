import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {MainPage} from './pages/MainPage';
import './initFirebase';
import {TestPage} from './pages/TestPage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import {darkPalette, ligthPalette, theme} from './theme';
import {useTheme} from '@store/useTheme';

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}});

export function App() {
    const {currentTheme} = useTheme();

    const themePalette = currentTheme === 'dark' ? darkPalette : ligthPalette;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={{...theme, ...themePalette}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/" element={<MainPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
