import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {render} from '@/utils/testUtils';

import {EditMessage} from './EditMessageButton';

describe('EditMessage (кнопка редактирования)', () => {
	it('отображает кнопку с подписью для доступности', () => {
		render(<EditMessage handleClick={vi.fn()} />);

		expect(screen.getByRole('button', {name: 'edit message'})).toBeInTheDocument();
	});

	it('по клику передаёт true в handleClick', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<EditMessage handleClick={handleClick} />);

		await user.click(screen.getByRole('button', {name: 'edit message'}));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(true);
	});
});
