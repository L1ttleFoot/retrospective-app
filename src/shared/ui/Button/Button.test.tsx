import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {Button} from './Button';

describe('button component', () => {
	it('should render text inside button', () => {
		render(<Button>Test button</Button>);

		const buttonElemnt = screen.getByRole('button', {name: /Test button/i});

		expect(buttonElemnt).toBeInTheDocument();
	});

	it('should handle onclick event', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Button onClick={handleClick}>Click</Button>);

		const buttonElement = screen.getByRole('button', {name: /click/i});

		await user.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
