import {cleanup, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {afterEach, describe, expect, it} from 'vitest';

import {ROUTES} from '@/consts/routes';
import {useAuth} from '@/store/useAuth';
import {render} from '@/utils/testUtils';

import {ProtectedRoute} from './ProtectedRoute';

const renderWithRoutes = () =>
	render(
		<Routes>
			<Route
				path="/"
				element={<ProtectedRoute element={<div>secret</div>} allowedRoles={['admin']} />}
			/>
			<Route path="/login" element={<div>login page</div>} />
			<Route path={ROUTES.FORBIDDEN} element={<div>forbidden page</div>} />
		</Routes>,
	);

const setUser = (roleValue: string) =>
	useAuth.setState({
		userData: {
			id: '1',
			username: 'test',
			token: 't',
			isGuest: false,
			roles: [{id: 1, value: roleValue}],
		},
	});

describe('ProtectedRoute', () => {
	afterEach(() => {
		cleanup();
		useAuth.setState({userData: undefined});
		window.history.replaceState(null, '', '/');
	});

	it('redirects to login when user is not authorized', () => {
		renderWithRoutes();

		expect(screen.getByText('login page')).toBeInTheDocument();
	});

	it('renders element when user has allowed role', () => {
		setUser('admin');
		renderWithRoutes();

		expect(screen.getByText('secret')).toBeInTheDocument();
	});

	it('redirects to forbidden page when user role is not allowed', () => {
		setUser('user');
		renderWithRoutes();

		expect(screen.getByText('forbidden page')).toBeInTheDocument();
	});
});
