import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {Radio} from './Radio';

describe('radio element', () => {
	const defaultProps = {
		label: 'Option 1',
		value: 'opt1',
		name: 'test-group',
		checked: false,
		onChange: vi.fn(),
	};

	it('should render radio element', () => {
		render(<Radio {...defaultProps} />);

		const radio = screen.getByText('Option 1');

		expect(radio).toBeInTheDocument();
	});

	it('should handle onclick event', async () => {
		render(<Radio {...defaultProps} />);
		const user = userEvent.setup();

		const radio = screen.getByRole('radio');

		await user.click(radio);

		expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
	});

	it('should checked if checked', () => {
		render(<Radio {...defaultProps} checked={true} />);

		const radio = screen.getByRole('radio');

		expect(radio).toBeChecked();
	});
});
