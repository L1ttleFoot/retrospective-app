import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {useState} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {useToast} from '@/store/useToasts';
import {render} from '@/utils/testUtils';

import {Message} from '../BoardSection.types';
import {AddMessage} from './AddMessage';

const SECTION_ID = 'sec-1';
const COLOR = '#ffd700';

let queryClient: QueryClient;

const CacheSeed = ({messages}: {messages: Message[]}) => {
	queryClient = useQueryClient();
	useState(() => queryClient.setQueryData(['messages', SECTION_ID], {messages}));
	return null;
};

const existingMessage: Message = {
	id: 'msg-1',
	sectionId: SECTION_ID,
	text: 'Существующее',
	createdAt: new Date(),
	updatedAt: new Date(),
	pinnedAt: null,
	color: COLOR,
	reactions: [],
	authorId: 'author',
	ownerId: 'owner',
};

const getCachedIds = () =>
	queryClient
		.getQueryData<{messages: Message[]}>(['messages', SECTION_ID])
		?.messages.map((m) => m.id);

const renderAdd = (handleShowInput = vi.fn()) =>
	render(
		<>
			<CacheSeed messages={[existingMessage]} />
			<AddMessage sectionId={SECTION_ID} handleShowInput={handleShowInput} color={COLOR} />
		</>,
	);

describe('AddMessage', () => {
	let requests: {body: unknown}[];

	beforeEach(() => {
		requests = [];
		useToast.setState({toasts: []});
		server.use(
			http.post('*/api/messages', async ({request}) => {
				requests.push({body: await request.json()});
				return HttpResponse.json({id: 'msg-new'});
			}),
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('показывает поле ввода с подписью и получает фокус', () => {
		renderAdd();

		const input = screen.getByLabelText('add message text-area');

		expect(input).toHaveFocus();
		expect(input).toHaveValue('');
	});

	it('Enter с текстом отправляет POST с текстом и id секции и закрывает поле', async () => {
		const user = userEvent.setup();
		const handleShowInput = vi.fn();
		renderAdd(handleShowInput);

		await user.type(screen.getByLabelText('add message text-area'), 'Новая идея');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(requests).toHaveLength(1));
		expect(requests[0]).toEqual({body: {text: 'Новая идея', sectionId: SECTION_ID}});
		expect(handleShowInput).toHaveBeenCalledWith(false);
	});

	it('после успешной отправки очищает поле ввода', async () => {
		const user = userEvent.setup();
		renderAdd();
		const input = screen.getByLabelText('add message text-area');

		await user.type(input, 'Новая идея');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(input).toHaveValue(''));
	});

	it('оптимистично добавляет временное сообщение tempId в кэш до ответа сервера', async () => {
		let release: () => void = () => {};
		const gate = new Promise<void>((resolve) => {
			release = resolve;
		});
		server.use(
			http.post('*/api/messages', async () => {
				await gate;
				return HttpResponse.json({id: 'msg-new'});
			}),
		);
		const user = userEvent.setup();
		renderAdd();

		await user.type(screen.getByLabelText('add message text-area'), 'Оптимистично');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(getCachedIds()).toEqual(['msg-1', 'tempId']));
		release();
	});

	it('Enter с пустым или пробельным текстом не отправляет запрос, но закрывает поле', async () => {
		const user = userEvent.setup();
		const handleShowInput = vi.fn();
		renderAdd(handleShowInput);

		await user.type(screen.getByLabelText('add message text-area'), '   ');
		await user.keyboard('{Enter}');

		expect(handleShowInput).toHaveBeenCalledWith(false);
		expect(requests).toHaveLength(0);
	});

	it('Escape закрывает поле и очищает текст без отправки', async () => {
		const user = userEvent.setup();
		const handleShowInput = vi.fn();
		renderAdd(handleShowInput);
		const input = screen.getByLabelText('add message text-area');

		await user.type(input, 'Черновик');
		await user.keyboard('{Escape}');

		expect(handleShowInput).toHaveBeenCalledWith(false);
		expect(input).toHaveValue('');
		expect(requests).toHaveLength(0);
	});

	it('потеря фокуса с текстом отправляет сообщение и закрывает поле', async () => {
		const user = userEvent.setup();
		const handleShowInput = vi.fn();
		renderAdd(handleShowInput);

		await user.type(screen.getByLabelText('add message text-area'), 'Через blur');
		await user.tab();

		await waitFor(() => expect(requests).toHaveLength(1));
		expect(requests[0]).toEqual({body: {text: 'Через blur', sectionId: SECTION_ID}});
		expect(handleShowInput).toHaveBeenCalledWith(false);
	});

	it('потеря фокуса с пустым полем закрывает его без отправки', async () => {
		const user = userEvent.setup();
		const handleShowInput = vi.fn();
		renderAdd(handleShowInput);

		await user.tab();

		expect(handleShowInput).toHaveBeenCalledWith(false);
		expect(requests).toHaveLength(0);
	});

	it('при ошибке сервера показывает toast, откатывает кэш и убирает tempId', async () => {
		server.use(
			http.post('*/api/messages', () => HttpResponse.json({message: 'boom'}, {status: 500})),
		);
		const user = userEvent.setup();
		renderAdd();

		await user.type(screen.getByLabelText('add message text-area'), 'Упадёт');
		await user.keyboard('{Enter}');

		await waitFor(() =>
			expect(useToast.getState().toasts).toEqual([
				expect.objectContaining({message: 'Произошла ошибка', toastType: 'error'}),
			]),
		);
		expect(getCachedIds()).toEqual(['msg-1']);
	});
});
