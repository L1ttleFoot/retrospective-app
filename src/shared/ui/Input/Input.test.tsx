import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {Input} from './Input';

describe('input component', () => {
	it('should show input text', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<Input onChange={handleChange} />);

		const input = screen.getByRole('textbox');

		await user.type(input, 'Hello');

		expect(input).toHaveValue('Hello');

		expect(handleChange).toHaveBeenCalledTimes(5);
	});

	it('should throw HTML attributes (placeholder, name)', () => {
		render(<Input name="email" placeholder="Введите email" />);
		const input = screen.getByPlaceholderText('Введите email');

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('name', 'email');
	});
});
