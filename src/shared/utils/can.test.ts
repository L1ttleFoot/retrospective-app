import {describe, expect, it} from 'vitest';

import {can} from './can';

const owner = {userId: 'owner', ownerId: 'owner', authorId: 'author'};
const author = {userId: 'author', ownerId: 'owner', authorId: 'author'};
const stranger = {userId: 'stranger', ownerId: 'owner', authorId: 'author'};
const guest = {userId: undefined, ownerId: 'owner', authorId: 'author'};

describe('can', () => {
	it('owner can do everything with any message', () => {
		for (const action of [
			'message.move',
			'message.edit',
			'message.delete',
			'message.pin',
		] as const) {
			expect(can(action, owner)).toBe(true);
		}
	});

	it('author can move, edit, delete own message but not pin it', () => {
		expect(can('message.move', author)).toBe(true);
		expect(can('message.edit', author)).toBe(true);
		expect(can('message.delete', author)).toBe(true);
		expect(can('message.pin', author)).toBe(true);
	});

	it('author cannot act on messages written by others', () => {
		const otherAuthor = {userId: 'author', ownerId: 'owner', authorId: 'someone-else'};
		expect(can('message.edit', otherAuthor)).toBe(false);
		expect(can('message.delete', otherAuthor)).toBe(false);
	});

	it('stranger has no message actions', () => {
		expect(can('message.move', stranger)).toBe(false);
		expect(can('message.edit', stranger)).toBe(false);
		expect(can('message.delete', stranger)).toBe(false);
		expect(can('message.pin', stranger)).toBe(false);
	});

	it('logged-out user has no actions, including reactions', () => {
		expect(can('message.move', guest)).toBe(false);
		expect(can('message.edit', guest)).toBe(false);
		expect(can('message.delete', guest)).toBe(false);
		expect(can('message.pin', guest)).toBe(false);
		expect(can('message.react', guest)).toBe(false);
	});

	it('logged-in user can react', () => {
		expect(can('message.react', stranger)).toBe(true);
	});
});
