import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook, waitFor} from '@testing-library/react';
import {HttpResponse, http} from 'msw';
import type {ReactNode} from 'react';
import {describe, expect, it} from 'vitest';

import {server} from '@/src/mocks/node';

import {useSectionsTemplatesData} from './useSectionsTemplates';

const createWrapper = () => {
	const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
	const wrapper = ({children}: {children: ReactNode}) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	return {queryClient, wrapper};
};

describe('useSectionsTemplatesData', () => {
	it('запрашивает шаблоны по /api/templates и возвращает их', async () => {
		const templates = {templates: [{id: 't1', title: 'Retro'}]};
		const requested: string[] = [];
		server.use(
			http.get('*/api/templates', ({request}) => {
				requested.push(new URL(request.url).pathname);
				return HttpResponse.json(templates);
			}),
		);
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useSectionsTemplatesData(), {wrapper});

		expect(result.current.templatesData).toEqual({templates: []});
		expect(result.current.isFetching).toBe(true);

		await waitFor(() => expect(result.current.templatesData).toEqual(templates));
		expect(result.current.isFetching).toBe(false);
		expect(requested).toEqual([expect.stringMatching(/\/api\/templates$/)]);
		expect(queryClient.getQueryCache().find({queryKey: ['templates']})).toBeDefined();
	});

	it('при ошибке сервера сохраняет пустой fallback; query переходит в статус error', async () => {
		server.use(
			http.get('*/api/templates', () => HttpResponse.json({message: 'boom'}, {status: 500})),
		);
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useSectionsTemplatesData(), {wrapper});

		await waitFor(() => expect(queryClient.getQueryState(['templates'])?.status).toBe('error'));
		expect(result.current.isFetching).toBe(false);
		expect(result.current.templatesData).toEqual({templates: []});
	});
});
