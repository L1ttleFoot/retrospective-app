import {cleanup, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HttpResponse, http} from 'msw';
import {Route, Routes} from 'react-router-dom';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {server} from '@/src/mocks/node';
import {useAuth} from '@/store/useAuth';
import {useToast} from '@/store/useToasts';
import {render} from '@/utils/testUtils';

import {LoginPage} from './LoginPage';

const USER = {id: '1', username: 'ivan', token: 'token-123', roles: [], isGuest: false};
const ERROR_TEXT = 'Неправильно введена почта или пароль';

type UserEvent = ReturnType<typeof userEvent.setup>;

const renderLogin = () =>
	render(
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/" element={<div>home page</div>} />
			<Route path="/register" element={<div>register page</div>} />
		</Routes>,
	);

const fillForm = async (user: UserEvent, username = 'ivan', password = 'secret') => {
	await user.type(screen.getByPlaceholderText('Логин'), username);
	await user.type(screen.getByPlaceholderText('Пароль'), password);
};

const submitForm = async (user: UserEvent) => {
	await fillForm(user);
	await user.click(screen.getByRole('button', {name: 'Войти'}));
};

const mockRefreshFails = () =>
	server.use(
		http.get('*/api/auth/refresh', () => new HttpResponse(null, {status: 500})),
		http.post('*/api/auth/logout', () => new HttpResponse(null, {status: 200})),
	);

describe('LoginPage', () => {
	beforeEach(() => {
		window.history.replaceState(null, '', '/login');
		localStorage.clear();
		useAuth.setState({userData: undefined, isAuth: false});
		useToast.setState({toasts: []});
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	describe('валидация', () => {
		it('кнопка «Войти» неактивна, пока поля пусты, и текст ошибки не показан', () => {
			renderLogin();

			expect(screen.getByRole('button', {name: 'Войти'})).toBeDisabled();
			expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument();
		});

		it('кнопка остается неактивной, если заполнен только логин', async () => {
			const user = userEvent.setup();
			renderLogin();

			await user.type(screen.getByPlaceholderText('Логин'), 'ivan');

			expect(screen.getByRole('button', {name: 'Войти'})).toBeDisabled();
		});

		it('кнопка активируется после заполнения логина и пароля', async () => {
			const user = userEvent.setup();
			renderLogin();

			await fillForm(user);

			expect(screen.getByRole('button', {name: 'Войти'})).toBeEnabled();
		});

		it('не отправляет запрос, если форма невалидна', async () => {
			const onLogin = vi.fn();
			server.use(
				http.post('*/api/auth/login', () => {
					onLogin();
					return HttpResponse.json(USER);
				}),
			);
			const user = userEvent.setup();
			renderLogin();

			await user.type(screen.getByPlaceholderText('Логин'), 'ivan');
			await user.click(screen.getByRole('button', {name: 'Войти'}));

			expect(onLogin).not.toHaveBeenCalled();
		});
	});

	describe('успешный вход', () => {
		it('отправляет POST на /api/auth/login с логином и паролем', async () => {
			let captured: {method: string; url: string; body: unknown} | null = null;
			server.use(
				http.post('*/api/auth/login', async ({request}) => {
					captured = {method: request.method, url: request.url, body: await request.json()};
					return HttpResponse.json(USER);
				}),
			);
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);

			await waitFor(() => expect(captured).not.toBeNull());
			expect(captured).toMatchObject({
				method: 'POST',
				body: {username: 'ivan', password: 'secret'},
			});
			expect((captured as unknown as {url: string}).url).toMatch(/\/api\/auth\/login$/);
		});

		it('сохраняет userData из ответа в useAuth и помечает пользователя авторизованным', async () => {
			server.use(http.post('*/api/auth/login', () => HttpResponse.json(USER)));
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);

			await waitFor(() => expect(useAuth.getState().isAuth).toBe(true));
			expect(useAuth.getState().userData).toEqual(USER);
		});

		it('перенаправляет на главную страницу после входа', async () => {
			server.use(http.post('*/api/auth/login', () => HttpResponse.json(USER)));
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);

			expect(await screen.findByText('home page')).toBeInTheDocument();
			expect(window.location.pathname).toBe('/');
		});

		it('сразу уводит на главную, если пользователь уже авторизован', () => {
			useAuth.setState({userData: USER, isAuth: true});

			renderLogin();

			expect(screen.getByText('home page')).toBeInTheDocument();
			expect(window.location.pathname).toBe('/');
		});
	});

	describe('ошибки сервера', () => {
		it.each([{status: 400}, {status: 409}, {status: 500}])(
			'показывает общее сообщение при ответе $status',
			async ({status}) => {
				server.use(http.post('*/api/auth/login', () => HttpResponse.json({error: 'x'}, {status})));
				const user = userEvent.setup();
				renderLogin();

				await submitForm(user);

				expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument();
				expect(useAuth.getState().userData).toBeUndefined();
				expect(useAuth.getState().isAuth).toBe(false);
				expect(window.location.pathname).toBe('/login');
			},
		);

		it('401: показывает сообщение, userData не сохраняется, toast не создается', async () => {
			vi.spyOn(console, 'error').mockImplementation(() => {});
			mockRefreshFails();
			server.use(
				http.post('*/api/auth/login', () => HttpResponse.json({error: 'bad'}, {status: 401})),
			);
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);

			expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument();
			expect(useAuth.getState().userData).toBeUndefined();
			expect(useToast.getState().toasts).toHaveLength(0);
		});

		it('сетевая ошибка (нет response) показывает то же сообщение', async () => {
			server.use(http.post('*/api/auth/login', () => HttpResponse.error()));
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);

			expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument();
			expect(useAuth.getState().isAuth).toBe(false);
		});
	});

	describe('известные баги', () => {
		it('401 на логин не должен вызывать более одного refresh-запроса', async () => {
			let refreshCalls = 0;
			server.use(
				http.post('*/api/auth/login', () => HttpResponse.json({error: 'bad'}, {status: 401})),
				http.get('*/api/auth/refresh', () => {
					refreshCalls++;
					return HttpResponse.json({error: 'no'}, {status: refreshCalls > 5 ? 500 : 401});
				}),
				http.post('*/api/auth/logout', () => new HttpResponse(null, {status: 200})),
			);
			vi.spyOn(console, 'error').mockImplementation(() => {});
			const user = userEvent.setup();
			renderLogin();

			await submitForm(user);
			await screen.findByText(ERROR_TEXT, undefined, {timeout: 3000});

			expect(refreshCalls).toBe(1);
		});
	});
});
