import {act, cleanup, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {Route, Routes} from 'react-router-dom';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {useAuth} from '@/store/useAuth';
import {render} from '@/utils/testUtils';

import {RegisterPage} from './RegisterPage';

const GENERIC_ERROR = 'Произошла неизвестная ошибка';
const MISMATCH_ERROR = 'Пароли не совпадают';

type UserEvent = ReturnType<typeof userEvent.setup>;

const renderRegister = () =>
	render(
		<Routes>
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<div>login page</div>} />
		</Routes>,
	);

const fillForm = async (
	user: UserEvent,
	{username = 'ivan', password = 'secret', confirm = 'secret'} = {},
) => {
	await user.type(screen.getByPlaceholderText('Логин'), username);
	await user.type(screen.getByPlaceholderText('Пароль'), password);
	await user.type(screen.getByPlaceholderText('Повторите пароль'), confirm);
};

const submitForm = async (user: UserEvent) => {
	await fillForm(user);
	await user.click(screen.getByRole('button', {name: 'Создать аккаунт'}));
};

describe('RegisterPage', () => {
	beforeEach(() => {
		window.history.replaceState(null, '', '/register');
		localStorage.clear();
		useAuth.setState({userData: undefined, isAuth: false});
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	describe('валидация', () => {
		it('кнопка неактивна, пока поля пусты', () => {
			renderRegister();

			expect(screen.getByRole('button', {name: 'Создать аккаунт'})).toBeDisabled();
		});

		it('кнопка активна, когда все поля заполнены и пароли совпадают', async () => {
			const user = userEvent.setup();
			renderRegister();

			await fillForm(user);

			expect(screen.getByRole('button', {name: 'Создать аккаунт'})).toBeEnabled();
			expect(screen.queryByText(MISMATCH_ERROR)).not.toBeInTheDocument();
		});

		it('показывает «Пароли не совпадают» и блокирует кнопку', async () => {
			const user = userEvent.setup();
			renderRegister();

			await fillForm(user, {confirm: 'other'});

			expect(await screen.findByText(MISMATCH_ERROR)).toBeInTheDocument();
			expect(screen.getByRole('button', {name: 'Создать аккаунт'})).toBeDisabled();
		});

		it('после исправления пароля сообщение пропадает и кнопка активируется', async () => {
			const user = userEvent.setup();
			renderRegister();
			await fillForm(user, {confirm: 'other'});
			await screen.findByText(MISMATCH_ERROR);

			const confirm = screen.getByPlaceholderText('Повторите пароль');
			await user.clear(confirm);
			await user.type(confirm, 'secret');

			await waitFor(() => expect(screen.queryByText(MISMATCH_ERROR)).not.toBeInTheDocument());
			expect(screen.getByRole('button', {name: 'Создать аккаунт'})).toBeEnabled();
		});

		it('не отправляет запрос, если пароли не совпадают', async () => {
			const onRegister = vi.fn();
			server.use(
				http.post('*/api/auth/register', () => {
					onRegister();
					return new HttpResponse(null, {status: 201});
				}),
			);
			const user = userEvent.setup();
			renderRegister();
			await fillForm(user, {confirm: 'other'});

			const form = screen
				.getByRole('button', {name: 'Создать аккаунт'})
				.closest('form') as HTMLFormElement;
			await act(async () => {
				fireEvent.submit(form);
			});

			expect(onRegister).not.toHaveBeenCalled();
		});
	});

	describe('успешная регистрация', () => {
		it('отправляет POST на /api/auth/register только с username и password', async () => {
			let captured: {method: string; url: string; body: unknown} | null = null;
			server.use(
				http.post('*/api/auth/register', async ({request}) => {
					captured = {method: request.method, url: request.url, body: await request.json()};
					return new HttpResponse(null, {status: 201});
				}),
			);
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			await waitFor(() => expect(captured).not.toBeNull());
			expect(captured).toMatchObject({
				method: 'POST',
				body: {username: 'ivan', password: 'secret'},
			});
			expect((captured as unknown as {url: string}).url).toMatch(/\/api\/auth\/register$/);
		});

		it('перенаправляет на /login после регистрации', async () => {
			server.use(http.post('*/api/auth/register', () => new HttpResponse(null, {status: 201})));
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText('login page')).toBeInTheDocument();
			expect(window.location.pathname).toBe('/login');
		});

		it('не сохраняет userData в useAuth (автологина нет)', async () => {
			server.use(http.post('*/api/auth/register', () => new HttpResponse(null, {status: 201})));
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText('login page')).toBeInTheDocument();
			expect(useAuth.getState().userData).toBeUndefined();
			expect(useAuth.getState().isAuth).toBe(false);
		});
	});

	describe('ошибки сервера', () => {
		it.each([
			{status: 400, message: 'Некорректные данные'},
			{status: 409, message: 'Пользователь уже существует'},
			{status: 500, message: 'Внутренняя ошибка сервера'},
		])('показывает error из тела ответа при $status', async ({status, message}) => {
			server.use(
				http.post('*/api/auth/register', () => HttpResponse.json({error: message}, {status})),
			);
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText(message)).toBeInTheDocument();
			expect(window.location.pathname).toBe('/register');
			expect(useAuth.getState().userData).toBeUndefined();
		});

		it('ответ 500 с пустым телом показывает «Произошла неизвестная ошибка»', async () => {
			server.use(http.post('*/api/auth/register', () => new HttpResponse(null, {status: 500})));
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText(GENERIC_ERROR)).toBeInTheDocument();
			expect(window.location.pathname).toBe('/register');
		});

		it('сетевая ошибка (нет response) показывает «Произошла неизвестная ошибка»', async () => {
			server.use(http.post('*/api/auth/register', () => HttpResponse.error()));
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText(GENERIC_ERROR)).toBeInTheDocument();
			expect(window.location.pathname).toBe('/register');
		});
	});

	describe('известные баги', () => {
		it.fails('ответ 500 с текстовым телом должен показывать сообщение об ошибке', async () => {
			server.use(
				http.post('*/api/auth/register', () =>
					HttpResponse.text('<html>Bad Gateway</html>', {status: 500}),
				),
			);
			const user = userEvent.setup();
			renderRegister();

			await submitForm(user);

			expect(await screen.findByText(GENERIC_ERROR)).toBeInTheDocument();
		});
	});
});
