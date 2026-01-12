import {useDebounce} from '@/hooks/useDebounce';

import * as Styled from './TestPage.styled';

export const DebouncePlace = () => {
	const debouncedFunc = useDebounce(
		(e: {clientX: number; clientY: number}) => console.log({x: e.clientX, y: e.clientY}),
		200,
	);

	const onMouseMoveHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
		debouncedFunc(e);
	};

	return (
		<Styled.TestSandboxes onMouseMove={onMouseMoveHandler}>
			Debounce Test Place
		</Styled.TestSandboxes>
	);
};
