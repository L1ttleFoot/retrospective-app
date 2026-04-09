import {describe, expect, it} from 'vitest';

import {capitalize} from './capitalize';
import {formatDate} from './dateUtils';

describe('utils test', () => {
	it('should capitalize string', () => {
		expect(capitalize('test')).toBe('Test');
		expect(capitalize('test with several words')).toBe('Test with several words');
		expect(capitalize('123')).toBe('123');
		expect(capitalize('')).toBe('');
	});

	it('should format string', () => {
		expect(formatDate(new Date('2026.02.12'))).toBe('12-02-2026');
	});
});
