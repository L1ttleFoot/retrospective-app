import {cleanup, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {useAuth} from '@/store/useAuth';
import {render} from '@/utils/testUtils';

import {AuthInit} from './AuthInit';

describe('AuthInit', () => {
	afterEach(() => {
		cleanup();
		useAuth.setState({isReady: false});
	});

	it('shows loading spinner until auth is ready', () => {
		useAuth.setState({isReady: false, checkAuth: vi.fn()});
		render(<AuthInit>content</AuthInit>);

		expect(screen.queryByText('content')).not.toBeInTheDocument();
	});

	it('renders children when auth is ready', () => {
		useAuth.setState({isReady: true, checkAuth: vi.fn()});
		render(<AuthInit>content</AuthInit>);

		expect(screen.getByText('content')).toBeInTheDocument();
	});

	it('calls checkAuth on mount', () => {
		const checkAuth = vi.fn();
		useAuth.setState({isReady: false, checkAuth});
		render(<AuthInit>content</AuthInit>);

		expect(checkAuth).toHaveBeenCalledTimes(1);
	});
});
