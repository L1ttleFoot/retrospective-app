import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RenderOptions, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {theme, themePallets} from '@/src/theme';

const createTestQueryClient = () => new QueryClient({defaultOptions: {queries: {retry: false}}});

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
	const currentTheme = 'light';
	const themePalette = themePallets[currentTheme];

	return (
		<QueryClientProvider client={createTestQueryClient()}>
			<ThemeProvider theme={{...theme, ...themePalette, currentTheme}}>
				<BrowserRouter>{children}</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';

export {customRender as render};
