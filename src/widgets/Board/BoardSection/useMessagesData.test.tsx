import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook, waitFor} from '@testing-library/react';
import {HttpResponse, http} from 'msw';
import type {ReactNode} from 'react';
import {describe, expect, it} from 'vitest';

import {server} from '@/src/mocks/node';

import {useMessagesData} from './useMessagesData';

const createWrapper = () => {
	const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
	const wrapper = ({children}: {children: ReactNode}) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	return {queryClient, wrapper};
};

describe('useMessagesData', () => {
	it('запрашивает сообщения секции и возвращает их', async () => {
		const requested: string[] = [];
		server.use(
			http.get('*/api/sections/:sectionId/messages', ({request, params}) => {
				requested.push(new URL(request.url).pathname);
				return HttpResponse.json({messages: [{id: 'm1', text: `from ${params.sectionId}`}]});
			}),
		);
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useMessagesData('s1'), {wrapper});

		expect(result.current.messagesData).toEqual({messages: []});
		expect(result.current.isFetching).toBe(true);

		await waitFor(() =>
			expect(result.current.messagesData).toEqual({messages: [{id: 'm1', text: 'from s1'}]}),
		);
		expect(result.current.isFetching).toBe(false);
		expect(requested).toEqual([expect.stringMatching(/\/api\/sections\/s1\/messages$/)]);
		expect(queryClient.getQueryCache().find({queryKey: ['messages', 's1']})).toBeDefined();
	});

	it('при смене sectionId запрашивает сообщения другой секции', async () => {
		const requested: string[] = [];
		server.use(
			http.get('*/api/sections/:sectionId/messages', ({request, params}) => {
				requested.push(new URL(request.url).pathname);
				return HttpResponse.json({messages: [{id: `${params.sectionId}-m`}]});
			}),
		);
		const {wrapper} = createWrapper();

		const {result, rerender} = renderHook(
			({sectionId}: {sectionId: string}) => useMessagesData(sectionId),
			{initialProps: {sectionId: 's1'}, wrapper},
		);

		await waitFor(() => expect(result.current.messagesData).toEqual({messages: [{id: 's1-m'}]}));

		rerender({sectionId: 's2'});

		await waitFor(() => expect(result.current.messagesData).toEqual({messages: [{id: 's2-m'}]}));
		expect(requested).toHaveLength(2);
		expect(requested[1]).toMatch(/\/api\/sections\/s2\/messages$/);
	});

	it('при ошибке сервера сохраняет пустой fallback; query переходит в статус error', async () => {
		server.use(
			http.get('*/api/sections/:sectionId/messages', () =>
				HttpResponse.json({message: 'boom'}, {status: 500}),
			),
		);
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useMessagesData('s1'), {wrapper});

		await waitFor(() =>
			expect(queryClient.getQueryState(['messages', 's1'])?.status).toBe('error'),
		);
		expect(result.current.isFetching).toBe(false);
		expect(result.current.messagesData).toEqual({messages: []});
	});
});
