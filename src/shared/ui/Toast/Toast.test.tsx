import {act, cleanup, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {toasts, useToast} from '@/store/useToasts';
import {render} from '@/utils/testUtils';

import {ToastsContainer} from './ToastsContainer';

describe('ToastsContainer', () => {
	beforeEach(() => {
		const root = document.createElement('div');
		root.id = 'toast-root';
		document.body.appendChild(root);
	});

	afterEach(() => {
		cleanup();
		document.getElementById('toast-root')?.remove();
		useToast.setState({toasts: []});
	});

	it('renders message and description of toasts from store', () => {
		useToast.setState({
			toasts: [
				{
					id: '1',
					message: 'Сохранено',
					description: 'Детали',
					toastType: 'success',
					duration: 3000,
				},
			],
		});
		render(<ToastsContainer />);

		expect(screen.getByText('Сохранено')).toBeInTheDocument();
		expect(screen.getByText('Детали')).toBeInTheDocument();
	});

	it('does not render description when it is missing', () => {
		useToast.setState({toasts: [{id: '1', message: 'Ошибка', toastType: 'error', duration: 3000}]});
		render(<ToastsContainer />);

		expect(screen.getByText('Ошибка')).toBeInTheDocument();
		expect(screen.queryByText('Детали')).not.toBeInTheDocument();
	});

	it('shows toast added via toasts helper', () => {
		render(<ToastsContainer />);

		act(() => toasts.warning('Внимание'));

		expect(screen.getByText('Внимание')).toBeInTheDocument();
		expect(useToast.getState().toasts[0].toastType).toBe('warning');
	});
});

describe('useToast store', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		useToast.setState({toasts: []});
	});

	it('removes toast after its duration', () => {
		act(() => toasts.info('Пауза', undefined, 1000));
		expect(useToast.getState().toasts).toHaveLength(1);

		act(() => vi.advanceTimersByTime(999));
		expect(useToast.getState().toasts).toHaveLength(1);

		act(() => vi.advanceTimersByTime(1));
		expect(useToast.getState().toasts).toHaveLength(0);
	});

	it('defaults to error type', () => {
		act(() => useToast.getState().addToast({message: 'Упс'}));

		expect(useToast.getState().toasts[0].toastType).toBe('error');
	});
});
