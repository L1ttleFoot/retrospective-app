import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {ToggleButton} from './ToggleButton';

describe('ToggleButton', () => {
	it('renders a button', () => {
		render(<ToggleButton value={false} onToggle={vi.fn()} />);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('calls onToggle on click', async () => {
		const onToggle = vi.fn();
		const user = userEvent.setup();
		render(<ToggleButton value={false} onToggle={onToggle} />);

		await user.click(screen.getByRole('button'));

		expect(onToggle).toHaveBeenCalledTimes(1);
	});
});
