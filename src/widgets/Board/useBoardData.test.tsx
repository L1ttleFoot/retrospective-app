import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {act, renderHook, waitFor} from '@testing-library/react';
import type {AxiosError} from 'axios';
import {HttpResponse, http} from 'msw';
import type {ReactNode} from 'react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {server} from '@/src/mocks/node';
import {useBoards} from '@/store/useBoards';

import {useBoardData} from './useBoardData';

const createWrapper = () => {
	const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});
	const wrapper = ({children}: {children: ReactNode}) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	return {queryClient, wrapper};
};

beforeEach(() => {
	useBoards.setState({currentBoardId: ''});
});

afterEach(() => {
	useBoards.setState({currentBoardId: ''});
});

describe('useBoardData', () => {
	it('запрашивает секции текущей доски и возвращает их', async () => {
		const requested: string[] = [];
		server.use(
			http.get('*/api/boards/:boardId/sections', ({request, params}) => {
				requested.push(new URL(request.url).pathname);
				return HttpResponse.json({
					boardTitle: `Board ${params.boardId}`,
					sections: [{id: `${params.boardId}-s1`, title: 'Good'}],
				});
			}),
		);
		useBoards.setState({currentBoardId: 'b1'});
		const {queryClient, wrapper} = createWrapper();

		const {result} = renderHook(() => useBoardData(), {wrapper});

		expect(result.current.sectionsData).toEqual({boardTitle: '', sections: []});
		expect(result.current.isFetching).toBe(true);

		await waitFor(() =>
			expect(result.current.sectionsData).toEqual({
				boardTitle: 'Board b1',
				sections: [{id: 'b1-s1', title: 'Good'}],
			}),
		);
		expect(result.current.isFetching).toBe(false);
		expect(result.current.error).toBeNull();
		expect(requested).toEqual([expect.stringMatching(/\/api\/boards\/b1\/sections$/)]);
		expect(queryClient.getQueryCache().find({queryKey: ['sections', 'b1']})).toBeDefined();
	});

	it('не отправляет запрос при пустом currentBoardId (enabled: false)', async () => {
		let calls = 0;
		server.use(
			http.get('*/api/boards/:boardId/sections', () => {
				calls++;
				return HttpResponse.json({sections: []});
			}),
		);
		const {wrapper} = createWrapper();

		const {result} = renderHook(() => useBoardData(), {wrapper});

		await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

		expect(calls).toBe(0);
		expect(result.current.isFetching).toBe(false);
		expect(result.current.sectionsData).toEqual({boardTitle: '', sections: []});
	});

	it('при смене currentBoardId в store запрашивает секции новой доски', async () => {
		const requested: string[] = [];
		server.use(
			http.get('*/api/boards/:boardId/sections', ({request, params}) => {
				requested.push(new URL(request.url).pathname);
				return HttpResponse.json({
					boardTitle: `Board ${params.boardId}`,
					sections: [{id: `${params.boardId}-s1`}],
				});
			}),
		);
		useBoards.setState({currentBoardId: 'b1'});
		const {wrapper} = createWrapper();
		const {result} = renderHook(() => useBoardData(), {wrapper});

		await waitFor(() =>
			expect(result.current.sectionsData).toEqual({
				boardTitle: 'Board b1',
				sections: [{id: 'b1-s1'}],
			}),
		);

		act(() => {
			useBoards.getState().setCurrentBoardId('b2');
		});

		await waitFor(() =>
			expect(result.current.sectionsData).toEqual({
				boardTitle: 'Board b2',
				sections: [{id: 'b2-s1'}],
			}),
		);
		expect(requested).toHaveLength(2);
		expect(requested[1]).toMatch(/\/api\/boards\/b2\/sections$/);
	});

	it('при ошибке сервера возвращает error и сохраняет начальное значение данных', async () => {
		server.use(
			http.get('*/api/boards/:boardId/sections', () =>
				HttpResponse.json({message: 'boom'}, {status: 500}),
			),
		);
		useBoards.setState({currentBoardId: 'b1'});
		const {wrapper} = createWrapper();

		const {result} = renderHook(() => useBoardData(), {wrapper});

		await waitFor(() => expect(result.current.error).not.toBeNull());
		expect((result.current.error as AxiosError).response?.status).toBe(500);
		expect(result.current.isFetching).toBe(false);
		expect(result.current.sectionsData).toEqual({boardTitle: '', sections: []});
	});
});
