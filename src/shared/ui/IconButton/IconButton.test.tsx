import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {IconButton} from './IconButton';

describe('icon button element', () => {
	it('should render icon button', () => {
		render(
			<IconButton>
				<div data-testid="icon" />
			</IconButton>,
		);

		const iconButton = screen.getByTestId('icon');

		expect(iconButton).toBeInTheDocument();
	});

	it('should handle onclick event', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<IconButton onClick={handleClick}>
				<div data-testid="icon" />
			</IconButton>,
		);
		const iconButton = screen.getByTestId('icon');

		await user.click(iconButton);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
