import {act, cleanup, fireEvent, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type {ComponentProps} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {useAuth} from '@/store/useAuth';
import {render} from '@/utils/testUtils';

import {MessageItem} from './MessageItem';

vi.mock('@floating-ui/react-dom', async (importOriginal) => ({
	...(await importOriginal<typeof import('@floating-ui/react-dom')>()),
	useFloating: () => ({
		refs: {setReference: () => {}, setFloating: () => {}},
		strategy: 'absolute',
		x: 0,
		y: 0,
	}),
}));

const OWNER_ID = 'owner-1';
const AUTHOR_ID = 'author-1';

type MessageItemProps = ComponentProps<typeof MessageItem>;

const baseProps: MessageItemProps = {
	id: 'msg-1',
	sectionId: 'sec-1',
	text: 'Привет',
	color: '#ffd700',
	pinnedAt: null,
	reactions: [],
	authorId: AUTHOR_ID,
	ownerId: OWNER_ID,
	ref: vi.fn(),
	onDragStart: vi.fn(),
	onPointerDown: vi.fn(),
};

const loginAs = (id: string) =>
	useAuth.setState({
		userData: {id, username: 'user', token: 'token', roles: [], isGuest: false},
		isAuth: true,
	});

const renderItem = async (overrides: Partial<MessageItemProps> = {}) => {
	let result!: ReturnType<typeof render>;
	await act(async () => {
		result = render(<MessageItem {...baseProps} {...overrides} />);
	});
	return result;
};

const getActionsArea = () => screen.getByLabelText('actions area');

describe('MessageItem', () => {
	beforeEach(() => {
		useAuth.setState({userData: undefined, isAuth: false});
	});

	afterEach(() => {
		cleanup();
		useAuth.setState({userData: undefined, isAuth: false});
	});

	it('отображает текст сообщения', async () => {
		await renderItem();

		expect(screen.getByText('Привет')).toBeInTheDocument();
	});

	it('владелец доски видит все действия: перенос, закрепление, редактирование и удаление', async () => {
		loginAs(OWNER_ID);
		await renderItem();

		expect(within(getActionsArea()).getAllByRole('button')).toHaveLength(4);
		expect(
			within(getActionsArea()).getByRole('button', {name: 'edit message'}),
		).toBeInTheDocument();
	});

	it('автор сообщения видит те же действия, что и владелец', async () => {
		loginAs(AUTHOR_ID);
		await renderItem();

		expect(within(getActionsArea()).getAllByRole('button')).toHaveLength(4);
	});

	it('чужой авторизованный пользователь не видит панель действий, но видит пикер реакций', async () => {
		loginAs('stranger');
		await renderItem();

		expect(screen.queryByLabelText('actions area')).not.toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('гость (без userId) не видит ни действий, ни пикера реакций', async () => {
		await renderItem();

		expect(screen.queryByLabelText('actions area')).not.toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('временное сообщение (tempId) не даёт действий и реакций даже владельцу', async () => {
		loginAs(OWNER_ID);
		await renderItem({id: 'tempId'});

		expect(screen.queryByLabelText('actions area')).not.toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('показывает текущие реакции и количество, если оно больше одного', async () => {
		loginAs('stranger');
		await renderItem({
			reactions: [
				{name: 'thumbsUp', char: '👍', count: 3, isSelected: true},
				{name: 'fire', char: '🔥', count: 1, isSelected: false},
			],
		});

		expect(screen.getByText('👍')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
		expect(screen.getByText('🔥')).toBeInTheDocument();
		expect(screen.queryByText('1')).not.toBeInTheDocument();
	});

	it('карточка становится draggable только при наведении на ручку', async () => {
		const user = userEvent.setup();
		loginAs(OWNER_ID);
		await renderItem();
		const wrapper = screen.getByText('Привет').closest('[draggable]');
		const gripButton = within(getActionsArea()).getAllByRole('button')[0];

		expect(wrapper).toHaveAttribute('draggable', 'false');

		await user.hover(gripButton);
		expect(wrapper).toHaveAttribute('draggable', 'true');

		await user.unhover(gripButton);
		expect(wrapper).toHaveAttribute('draggable', 'false');
	});

	it('гость не может перетаскивать карточку даже при наведении на кнопку', async () => {
		const user = userEvent.setup();
		loginAs('stranger');
		await renderItem();
		const wrapper = screen.getByText('Привет').closest('[draggable]');

		await user.hover(screen.getByRole('button'));

		expect(wrapper).toHaveAttribute('draggable', 'false');
	});

	it('перенос касанием начинается с ручки: нажатие на ручку вызывает onPointerDown', async () => {
		const onPointerDown = vi.fn();
		loginAs(OWNER_ID);
		await renderItem({onPointerDown});

		fireEvent.pointerDown(within(getActionsArea()).getAllByRole('button')[0]);

		expect(onPointerDown).toHaveBeenCalledTimes(1);
	});

	it('клик по карандашу переводит сообщение в режим редактирования с текстом', async () => {
		const user = userEvent.setup();
		loginAs(OWNER_ID);
		await renderItem();

		await user.click(within(getActionsArea()).getByRole('button', {name: 'edit message'}));

		expect(screen.getByRole('textbox')).toHaveValue('Привет');
		expect(screen.queryByLabelText('actions area')).not.toBeInTheDocument();
	});

	it('Enter без изменений текста возвращает в режим просмотра', async () => {
		const user = userEvent.setup();
		loginAs(OWNER_ID);
		await renderItem();
		await user.click(within(getActionsArea()).getByRole('button', {name: 'edit message'}));

		await user.keyboard('{Enter}');

		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		expect(screen.getByText('Привет')).toBeInTheDocument();
	});
});
