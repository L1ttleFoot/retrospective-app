import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {useState} from 'react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {server} from '@/src/mocks/node';
import {useToast} from '@/store/useToasts';
import {render} from '@/utils/testUtils';

import {Message, UserReaction} from '../../BoardSection.types';
import {ReactionsPicker} from './ReactionsPicker';
import {reactionList, reactionObj} from './ReactionsPicker.consts';

const MESSAGE_ID = 'msg-1';
const SECTION_ID = 'sec-1';

let queryClient: QueryClient;

const CacheSeed = ({messages}: {messages: Message[]}) => {
	queryClient = useQueryClient();
	useState(() => queryClient.setQueryData(['messages', SECTION_ID], {messages}));
	return null;
};

const makeMessage = (reactions: UserReaction[]): Message => ({
	id: MESSAGE_ID,
	sectionId: SECTION_ID,
	text: 'Текст',
	createdAt: new Date(),
	updatedAt: new Date(),
	pinnedAt: null,
	color: '#ffffff',
	reactions,
	authorId: 'author',
	ownerId: 'owner',
});

const renderPicker = (reactions: UserReaction[] = []) =>
	render(
		<>
			<CacheSeed messages={[makeMessage(reactions)]} />
			<ReactionsPicker
				messageId={MESSAGE_ID}
				sectionId={SECTION_ID}
				enabledReactions={reactionList}
				reactions={reactions}
			/>
		</>,
	);

const getCachedReactions = () =>
	queryClient.getQueryData<{messages: Message[]}>(['messages', SECTION_ID])?.messages[0].reactions;

describe('ReactionsPicker', () => {
	beforeEach(() => {
		const modalRoot = document.createElement('div');
		modalRoot.id = 'modal-root';
		document.body.appendChild(modalRoot);
		useToast.setState({toasts: []});
	});

	afterEach(() => {
		document.getElementById('modal-root')?.remove();
	});

	it('по умолчанию показывает только кнопку и не показывает список реакций', () => {
		renderPicker();

		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.queryByText('👍')).not.toBeInTheDocument();
	});

	it('открывает список всех доступных реакций по клику на кнопку', async () => {
		const user = userEvent.setup();
		renderPicker();

		await user.click(screen.getByRole('button'));

		expect(screen.getByText('👍')).toBeInTheDocument();
		expect(screen.getByText('👎')).toBeInTheDocument();
		expect(screen.getByText('🔥')).toBeInTheDocument();
	});

	it('закрывает список по клику на подложку', async () => {
		const user = userEvent.setup();
		renderPicker();
		await user.click(screen.getByRole('button'));

		const backdrop = screen.getByText('👍').parentElement?.parentElement as HTMLElement;
		await user.click(backdrop);

		expect(screen.queryByText('👍')).not.toBeInTheDocument();
	});

	it('отправляет на сервер имя выбранной реакции и закрывает список', async () => {
		const requests: {messageId: string; body: unknown}[] = [];
		server.use(
			http.post('*/api/messages/:messageId/reaction', async ({request, params}) => {
				requests.push({messageId: String(params.messageId), body: await request.json()});
				return HttpResponse.json({});
			}),
		);
		const user = userEvent.setup();
		renderPicker();
		await user.click(screen.getByRole('button'));

		await user.click(screen.getByText('👍'));

		await waitFor(() => expect(requests).toHaveLength(1));
		expect(requests[0]).toEqual({messageId: MESSAGE_ID, body: {reaction: 'thumbsUp'}});
		expect(screen.queryByText('👍')).not.toBeInTheDocument();
	});

	it('повторный выбор уже выбранной реакции убирает её из кэша (count=1 -> удаление)', async () => {
		server.use(http.post('*/api/messages/:messageId/reaction', () => HttpResponse.json({})));
		const user = userEvent.setup();
		renderPicker([{name: 'thumbsUp', char: '👍', count: 1, isSelected: true}]);
		await user.click(screen.getByRole('button'));

		await user.click(screen.getByText('👍'));

		await waitFor(() => expect(getCachedReactions()).toEqual([]));
	});

	it('выбор новой реакции добавляет её в кэш как выбранную с count=1', async () => {
		server.use(http.post('*/api/messages/:messageId/reaction', () => HttpResponse.json({})));
		const user = userEvent.setup();
		renderPicker();
		await user.click(screen.getByRole('button'));

		await user.click(screen.getByText('🔥'));

		await waitFor(() =>
			expect(getCachedReactions()).toEqual([
				{name: 'fire', char: '🔥', count: 1, isSelected: true},
			]),
		);
	});

	it('при ошибке сервера показывает toast о запрете и откатывает кэш', async () => {
		server.use(
			http.post('*/api/messages/:messageId/reaction', () =>
				HttpResponse.json({message: 'forbidden'}, {status: 403}),
			),
		);
		const user = userEvent.setup();
		renderPicker();
		await user.click(screen.getByRole('button'));

		await user.click(screen.getByText('🔥'));

		await waitFor(() =>
			expect(useToast.getState().toasts).toEqual([
				expect.objectContaining({
					message: 'Доступ ограничен',
					description: 'У вас нет прав для выполнения этого действия.',
					toastType: 'error',
				}),
			]),
		);
		expect(getCachedReactions()).toEqual([]);
	});
});

describe('ReactionsPicker.consts', () => {
	it('reactionObj содержит символ для каждого имени из reactionList', () => {
		for (const {name, char} of reactionList) {
			expect(reactionObj[name as keyof typeof reactionObj]).toBe(char);
		}
		expect(Object.keys(reactionObj)).toEqual(reactionList.map(({name}) => name));
	});
});
