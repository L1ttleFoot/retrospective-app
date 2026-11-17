import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {useState} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {render} from '@/utils/testUtils';

import {Message} from '../../BoardSection.types';
import {EditMessageTextArea} from './EditMessageTextArea';

const MESSAGE_ID = 'msg-1';
const SECTION_ID = 'sec-1';
const ORIGINAL_TEXT = 'Привет';

let queryClient: QueryClient;

const CacheSeed = ({messages}: {messages: Message[]}) => {
	queryClient = useQueryClient();
	useState(() => queryClient.setQueryData(['messages', SECTION_ID], {messages}));
	return null;
};

const message: Message = {
	id: MESSAGE_ID,
	sectionId: SECTION_ID,
	text: ORIGINAL_TEXT,
	createdAt: new Date(),
	updatedAt: new Date(),
	pinnedAt: null,
	color: '#ffffff',
	reactions: [],
	authorId: 'author',
	ownerId: 'owner',
};

const getCachedText = () =>
	queryClient.getQueryData<{messages: Message[]}>(['messages', SECTION_ID])?.messages[0].text;

const renderTextArea = (handleEditField = vi.fn()) =>
	render(
		<>
			<CacheSeed messages={[message]} />
			<EditMessageTextArea
				text={ORIGINAL_TEXT}
				sectionId={SECTION_ID}
				messageId={MESSAGE_ID}
				handleEditField={handleEditField}
			/>
		</>,
	);

describe('EditMessageTextArea', () => {
	let requests: {messageId: string; body: unknown}[];

	beforeEach(() => {
		requests = [];
		server.use(
			http.patch('*/api/messages/:messageId', async ({request, params}) => {
				requests.push({messageId: String(params.messageId), body: await request.json()});
				return HttpResponse.json({});
			}),
		);
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('показывает текст сообщения и получает фокус сразу после открытия', () => {
		renderTextArea();

		const textarea = screen.getByRole('textbox');

		expect(textarea).toHaveValue(ORIGINAL_TEXT);
		expect(textarea).toHaveFocus();
	});

	it('Enter с изменённым текстом отправляет PATCH с новым текстом и закрывает редактирование', async () => {
		const user = userEvent.setup();
		const handleEditField = vi.fn();
		renderTextArea(handleEditField);
		const textarea = screen.getByRole('textbox');

		await user.clear(textarea);
		await user.type(textarea, 'Новый текст');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(requests).toHaveLength(1));
		expect(requests[0]).toEqual({messageId: MESSAGE_ID, body: {text: 'Новый текст'}});
		expect(handleEditField).toHaveBeenCalledWith(false);
	});

	it('оптимистично обновляет текст сообщения в кэше до ответа сервера', async () => {
		const user = userEvent.setup();
		renderTextArea();
		const textarea = screen.getByRole('textbox');

		await user.clear(textarea);
		await user.type(textarea, 'Новый текст');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(getCachedText()).toBe('Новый текст'));
	});

	it('Enter без изменений не отправляет запрос, но закрывает редактирование', async () => {
		const user = userEvent.setup();
		const handleEditField = vi.fn();
		renderTextArea(handleEditField);

		await user.keyboard('{Enter}');

		expect(handleEditField).toHaveBeenCalledWith(false);
		expect(requests).toHaveLength(0);
	});

	it('пустой текст при потере фокуса не отправляется, а возвращается исходный текст', async () => {
		const user = userEvent.setup();
		const handleEditField = vi.fn();
		renderTextArea(handleEditField);
		const textarea = screen.getByRole('textbox');

		await user.clear(textarea);
		await user.type(textarea, '   ');
		await user.tab();

		expect(requests).toHaveLength(0);
		expect(handleEditField).toHaveBeenCalledWith(false);
		expect(textarea).toHaveValue(ORIGINAL_TEXT);
	});

	it('потеря фокуса с изменённым текстом отправляет PATCH', async () => {
		const user = userEvent.setup();
		const handleEditField = vi.fn();
		renderTextArea(handleEditField);
		const textarea = screen.getByRole('textbox');

		await user.clear(textarea);
		await user.type(textarea, 'Через blur');
		await user.tab();

		await waitFor(() => expect(requests).toHaveLength(1));
		expect(requests[0]).toEqual({messageId: MESSAGE_ID, body: {text: 'Через blur'}});
		expect(handleEditField).toHaveBeenCalledWith(false);
	});

	it('при ошибке сервера откатывает текст в кэше и логирует ошибку', async () => {
		server.use(
			http.patch('*/api/messages/:messageId', () =>
				HttpResponse.json({message: 'boom'}, {status: 500}),
			),
		);
		const user = userEvent.setup();
		renderTextArea();
		const textarea = screen.getByRole('textbox');

		await user.clear(textarea);
		await user.type(textarea, 'Будет откат');
		await user.keyboard('{Enter}');

		await waitFor(() => expect(console.error).toHaveBeenCalled());
		await waitFor(() => expect(getCachedText()).toBe(ORIGINAL_TEXT));
	});
});
