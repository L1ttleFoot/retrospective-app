import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';

import {render} from '@/utils/testUtils';

import {DiscussionsList} from './DiscussionsList';

describe('Discussions list', () => {
	it('should render discussions list', async () => {
		render(<DiscussionsList />);

		const firstItem = await screen.findByText(/My test board/i);
		const secondItem = await screen.findByText(/123/i);

		expect(firstItem).toBeInTheDocument();
		expect(secondItem).toBeInTheDocument();
	});

	it('меняет URL при клике на элемент списка', async () => {
		const user = userEvent.setup();
		render(<DiscussionsList />);

		const item = await screen.findByText(/My test board/i);

		await user.click(item);

		expect(window.location.search).toContain('id=cmmaik6tx000004l4j2k6fw7p');
	});
});
