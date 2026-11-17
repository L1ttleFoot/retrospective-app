import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {useState} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {render} from '@/utils/testUtils';

import {Message} from '../../BoardSection.types';
import {DeleteMessage} from './DeleteMessage';

const MESSAGE_ID = 'msg-1';
const SECTION_ID = 'sec-1';

let queryClient: QueryClient;

const CacheSeed = ({messages}: {messages: Message[]}) => {
	queryClient = useQueryClient();
	useState(() => queryClient.setQueryData(['messages', SECTION_ID], {messages}));
	return null;
};

const makeMessage = (id: string): Message => ({
	id,
	sectionId: SECTION_ID,
	text: `Текст ${id}`,
	createdAt: new Date(),
	updatedAt: new Date(),
	pinnedAt: null,
	color: '#ffffff',
	reactions: [],
	authorId: 'author',
	ownerId: 'owner',
});

const messages = [makeMessage(MESSAGE_ID), makeMessage('msg-2')];

const getCachedIds = () =>
	queryClient
		.getQueryData<{messages: Message[]}>(['messages', SECTION_ID])
		?.messages.map((m) => m.id);

const renderDelete = (messageId = MESSAGE_ID) =>
	render(
		<>
			<CacheSeed messages={messages} />
			<DeleteMessage messageId={messageId} sectionId={SECTION_ID} />
		</>,
	);

describe('DeleteMessage', () => {
	let requestedPaths: string[];

	beforeEach(() => {
		requestedPaths = [];
		server.use(
			http.delete('*/api/messages/:messageId', ({request}) => {
				requestedPaths.push(new URL(request.url).pathname);
				return HttpResponse.json({});
			}),
		);
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('отображает кнопку удаления с подписью для доступности', () => {
		renderDelete();

		expect(screen.getByRole('button', {name: 'delete message'})).toBeInTheDocument();
	});

	it('по клику отправляет DELETE на адрес сообщения', async () => {
		const user = userEvent.setup();
		renderDelete();

		await user.click(screen.getByRole('button', {name: 'delete message'}));

		await waitFor(() => expect(requestedPaths).toHaveLength(1));
		expect(requestedPaths[0]).toBe(`/api/messages/${MESSAGE_ID}`);
	});

	it('оптимистично удаляет только это сообщение из кэша секции', async () => {
		const user = userEvent.setup();
		renderDelete();

		await user.click(screen.getByRole('button', {name: 'delete message'}));

		await waitFor(() => expect(getCachedIds()).toEqual(['msg-2']));
	});

	it('без messageId ничего не отправляет и не трогает кэш', async () => {
		const user = userEvent.setup();
		renderDelete('');

		await user.click(screen.getByRole('button', {name: 'delete message'}));

		expect(requestedPaths).toHaveLength(0);
		expect(getCachedIds()).toEqual([MESSAGE_ID, 'msg-2']);
	});

	it('при ошибке сервера возвращает сообщение в кэш и логирует ошибку', async () => {
		server.use(
			http.delete('*/api/messages/:messageId', () =>
				HttpResponse.json({message: 'boom'}, {status: 500}),
			),
		);
		const user = userEvent.setup();
		renderDelete();

		await user.click(screen.getByRole('button', {name: 'delete message'}));

		await waitFor(() => expect(console.error).toHaveBeenCalled());
		await waitFor(() => expect(getCachedIds()).toEqual([MESSAGE_ID, 'msg-2']));
	});
});
