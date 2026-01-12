import {useThrottle} from '@/hooks/useThrottle';

import * as Styled from './TestPage.styled';

export const ThrottlePlace = () => {
	const throttledFunc = useThrottle(
		(e: {clientX: number; clientY: number}) => console.log({x: e.clientX, y: e.clientY}),
		1000,
	);

	const onMouseMoveHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
		throttledFunc(e);
	};

	return (
		<Styled.TestSandboxes onMouseMove={onMouseMoveHandler}>
			Throttle Test Place
		</Styled.TestSandboxes>
	);
};
