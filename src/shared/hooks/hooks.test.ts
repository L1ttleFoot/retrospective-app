import {act, renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {useModal} from './useModal';

describe('useModal hook', () => {
	it('should have false default state', () => {
		const {result} = renderHook(() => useModal());
		expect(result.current.open).toBe(false);
	});

	it('should have true state after open', () => {
		const {result} = renderHook(() => useModal());

		act(() => {
			result.current.handleOpen();
		});

		expect(result.current.open).toBe(true);
	});

	it('should have false state after close', () => {
		const {result} = renderHook(() => useModal());

		act(() => {
			result.current.handleOpen();
		});

		expect(result.current.open).toBe(true);

		act(() => {
			result.current.handleClose();
		});

		expect(result.current.open).toBe(false);
	});
});
