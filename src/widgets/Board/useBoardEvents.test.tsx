import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {renderHook} from '@testing-library/react';
import type {ReactNode} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {useBoardEvents} from './useBoardEvents';

class FakeEventSource {
	static instances: FakeEventSource[] = [];
	listeners: Record<string, (event: MessageEvent) => void> = {};
	closed = false;

	constructor(public url: string) {
		FakeEventSource.instances.push(this);
	}

	addEventListener(name: string, cb: (event: MessageEvent) => void) {
		this.listeners[name] = cb;
	}

	close() {
		this.closed = true;
	}
}

afterEach(() => {
	FakeEventSource.instances = [];
	vi.unstubAllGlobals();
});

describe('useBoardEvents', () => {
	it('инвалидирует исходную и целевую секции при message.moved', () => {
		vi.stubGlobal('EventSource', FakeEventSource);
		const queryClient = new QueryClient();
		const spy = vi.spyOn(queryClient, 'invalidateQueries');
		const wrapper = ({children}: {children: ReactNode}) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		renderHook(() => useBoardEvents('b1'), {wrapper});

		const es = FakeEventSource.instances[0];
		expect(es.url).toContain('/api/boards/b1/events');

		es.listeners['message.moved']({
			data: JSON.stringify({sectionId: 's2', fromSectionId: 's1'}),
		} as MessageEvent);

		expect(spy).toHaveBeenCalledWith({queryKey: ['messages', 's2']});
		expect(spy).toHaveBeenCalledWith({queryKey: ['messages', 's1']});
	});
});
