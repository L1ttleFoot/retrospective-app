import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook, waitFor} from '@testing-library/react';
import {HttpResponse, http} from 'msw';
import type {ReactNode} from 'react';
import {describe, expect, it} from 'vitest';

import {server} from '@/src/mocks/node';

import {useAdminDashboard} from './useAdminDashboard';

const createWrapper = () => {
	const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
	const wrapper = ({children}: {children: ReactNode}) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	return {queryClient, wrapper};
};

describe('useAdminDashboard', () => {
	it.each(['user', 'role', 'reaction'] as const)(
		'запрашивает модель %s по правильному URL и возвращает данные',
		async (model) => {
			const requested: string[] = [];
			server.use(
				http.get('*/api/admin/:model/get', ({request, params}) => {
					requested.push(new URL(request.url).pathname);
					return HttpResponse.json([{id: 'x1', model: params.model}]);
				}),
			);
			const {queryClient, wrapper} = createWrapper();

			const {result} = renderHook(() => useAdminDashboard({model}), {wrapper});

			expect(result.current.data).toEqual([]);

			await waitFor(() => expect(result.current.data).toEqual([{id: 'x1', model}]));
			expect(requested).toEqual([expect.stringMatching(new RegExp(`/api/admin/${model}/get$`))]);
			expect(queryClient.getQueryCache().find({queryKey: ['getByModel', model]})).toBeDefined();
		},
	);

	it('при model: undefined не отправляет запрос (enabled: false)', async () => {
		let calls = 0;
		server.use(
			http.get('*/api/admin/:model/get', () => {
				calls++;
				return HttpResponse.json([]);
			}),
		);
		const {wrapper} = createWrapper();

		const {result} = renderHook(() => useAdminDashboard({model: undefined}), {wrapper});

		await new Promise((resolve) => setTimeout(resolve, 50));

		expect(calls).toBe(0);
		expect(result.current.data).toEqual([]);
	});

	it('при смене model запрашивает новую модель', async () => {
		server.use(
			http.get('*/api/admin/:model/get', ({params}) =>
				HttpResponse.json([{id: `${params.model}-1`}]),
			),
		);
		const {wrapper} = createWrapper();

		const {result, rerender} = renderHook(
			({model}: {model: 'user' | 'role'}) => useAdminDashboard({model}),
			{initialProps: {model: 'user'}, wrapper},
		);

		await waitFor(() => expect(result.current.data).toEqual([{id: 'user-1'}]));

		rerender({model: 'role'});

		await waitFor(() => expect(result.current.data).toEqual([{id: 'role-1'}]));
	});

	it('при ошибке сервера сохраняет пустой fallback; query переходит в статус error', async () => {
		server.use(
			http.get('*/api/admin/:model/get', () => HttpResponse.json({message: 'boom'}, {status: 500})),
		);
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useAdminDashboard({model: 'user'}), {wrapper});

		await waitFor(() =>
			expect(queryClient.getQueryState(['getByModel', 'user'])?.status).toBe('error'),
		);
		expect(result.current.data).toEqual([]);
	});
});
