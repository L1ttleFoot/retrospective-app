import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {useState} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {render} from '@/utils/testUtils';

import {Message} from '../../BoardSection.types';
import {PinMessage} from './PinMessage';

const SECTION_ID = 'sec-1';

let queryClient: QueryClient;

const CacheSeed = ({messages}: {messages: Message[]}) => {
	queryClient = useQueryClient();
	useState(() => queryClient.setQueryData(['messages', SECTION_ID], {messages}));
	return null;
};

const makeMessage = (id: string, overrides: Partial<Message> = {}): Message => ({
	id,
	sectionId: SECTION_ID,
	text: `Текст ${id}`,
	createdAt: new Date('2026-01-01T00:00:00Z'),
	updatedAt: new Date('2026-01-01T00:00:00Z'),
	pinnedAt: null,
	color: '#ffffff',
	reactions: [],
	authorId: 'author',
	ownerId: 'owner',
	...overrides,
});

const getCachedMessages = () =>
	queryClient.getQueryData<{messages: Message[]}>(['messages', SECTION_ID])?.messages ?? [];

const renderPin = (messages: Message[], pinnedAt: Date | null, messageId = 'msg-1') =>
	render(
		<>
			<CacheSeed messages={messages} />
			<PinMessage pinnedAt={pinnedAt} messageId={messageId} sectionId={SECTION_ID} />
		</>,
	);

describe('PinMessage', () => {
	let requestedPaths: string[];

	beforeEach(() => {
		requestedPaths = [];
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const registerOkHandlers = () => {
		server.use(
			http.post('*/api/messages/:messageId/pin', ({request}) => {
				requestedPaths.push(new URL(request.url).pathname);
				return HttpResponse.json({});
			}),
			http.post('*/api/messages/:messageId/unpin', ({request}) => {
				requestedPaths.push(new URL(request.url).pathname);
				return HttpResponse.json({});
			}),
		);
	};

	it('для незакреплённого сообщения показывает иконку закрепления и отправляет POST pin', async () => {
		registerOkHandlers();
		const user = userEvent.setup();
		const {container} = renderPin([makeMessage('msg-1')], null);

		expect(container.querySelector('.lucide-pin-off')).not.toBeInTheDocument();

		await user.click(screen.getByRole('button'));

		await waitFor(() => expect(requestedPaths).toHaveLength(1));
		expect(requestedPaths[0]).toBe('/api/messages/msg-1/pin');
	});

	it('для закреплённого сообщения показывает иконку открепления и отправляет POST unpin', async () => {
		registerOkHandlers();
		const user = userEvent.setup();
		const {container} = renderPin([makeMessage('msg-1', {pinnedAt: new Date()})], new Date());

		expect(container.querySelector('.lucide-pin-off')).toBeInTheDocument();

		await user.click(screen.getByRole('button'));

		await waitFor(() => expect(requestedPaths).toHaveLength(1));
		expect(requestedPaths[0]).toBe('/api/messages/msg-1/unpin');
	});

	it('оптимистично закрепляет сообщение и ставит закреплённые выше незакреплённых', async () => {
		registerOkHandlers();
		const user = userEvent.setup();
		renderPin(
			[
				makeMessage('msg-2', {updatedAt: new Date('2026-01-01T00:00:00Z')}),
				makeMessage('msg-1', {updatedAt: new Date('2026-01-02T00:00:00Z')}),
			],
			null,
		);

		await user.click(screen.getByRole('button'));

		await waitFor(() => expect(getCachedMessages().map((m) => m.id)).toEqual(['msg-1', 'msg-2']));
		expect(getCachedMessages()[0].pinnedAt).not.toBeNull();
		expect(getCachedMessages()[1].pinnedAt).toBeNull();
	});

	it('оптимистично открепляет сообщение в кэше', async () => {
		registerOkHandlers();
		const user = userEvent.setup();
		renderPin([makeMessage('msg-1', {pinnedAt: new Date()})], new Date());

		await user.click(screen.getByRole('button'));

		await waitFor(() => expect(getCachedMessages()[0].pinnedAt).toBeNull());
	});

	it('при ошибке сервера откатывает закрепление в кэше', async () => {
		server.use(
			http.post('*/api/messages/:messageId/pin', () =>
				HttpResponse.json({message: 'boom'}, {status: 500}),
			),
		);
		const user = userEvent.setup();
		renderPin([makeMessage('msg-1')], null);

		await user.click(screen.getByRole('button'));

		await waitFor(() => expect(queryClient.isMutating()).toBe(0));
		expect(getCachedMessages()[0].pinnedAt).toBeNull();
	});

	it('кнопка закрепления имеет подпись "pin message"', () => {
		renderPin([makeMessage('msg-1')], null);

		expect(screen.getByRole('button', {name: 'pin message'})).toBeInTheDocument();
	});
});
