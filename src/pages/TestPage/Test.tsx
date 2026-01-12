import {useEffect, useRef, useState} from 'react';

import {Chart} from '@/src/pages/TestPage/Chart';
import {AppBar} from '@/src/widgets/AppBar';

import {DebouncePlace} from './DebouncePlace';
import * as Styled from './TestPage.styled';
import {ThrottlePlace} from './ThrottlePlace';

export const Test = () => {
	const data = [
		{emoji: '😀', count: 30},
		{emoji: '😎', count: 80},
		{emoji: '😊', count: 45},
		{emoji: '😂', count: 60},
		{emoji: '😜', count: 20},
		{emoji: '😍', count: 90},
	];

	const useResizeObserver = (): [
		React.RefObject<HTMLDivElement>,
		{width: number; height: number},
	] => {
		const ref = useRef<HTMLDivElement>(null);
		const [dimensions, setDimensions] = useState<{width: number; height: number}>({
			width: 100,
			height: 100,
		});

		useEffect(() => {
			const resizeObserver = new ResizeObserver((entries) => {
				if (!entries || !entries.length) return;
				const {width, height} = entries[0].contentRect;
				setDimensions({width, height});
			});

			if (ref.current) {
				resizeObserver.observe(ref.current);
			}

			return () => {
				if (ref.current) {
					resizeObserver.unobserve(ref.current);
				}
			};
		}, []);

		return [ref, dimensions];
	};

	const [ref, dimensions] = useResizeObserver();

	return (
		<Styled.Wrapper>
			<AppBar />
			<Styled.Template>
				<Styled.ChartWrapper ref={ref}>
					<Chart data={data} dimensions={dimensions} />
				</Styled.ChartWrapper>
			</Styled.Template>
			<div style={{display: 'flex', gap: 20}}>
				<DebouncePlace />
				<ThrottlePlace />
			</div>
		</Styled.Wrapper>
	);
};
