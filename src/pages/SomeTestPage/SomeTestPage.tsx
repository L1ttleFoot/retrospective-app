import {useRef, useState} from 'react';

import * as Styled from './SomeTestPage.styled';

export const SomeTestPage = () => {
	const [position1, setPosition1] = useState({x: 100, y: 200});

	const [position2, setPosition2] = useState({x: 450, y: 150});

	const [dragging, setDragging] = useState(null);

	const [offset, setOffset] = useState({x: 0, y: 0});

	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (point) => (e) => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			// Вычисляем смещение курсора относительно центра элемента
			const offsetX = x - (point === 'A' ? position1.x : position2.x);
			const offsetY = y - (point === 'A' ? position1.y : position2.y);
			setOffset({x: offsetX, y: offsetY});
			setDragging(point);
		}
	};

	const handleMouseMove = (e) => {
		//console.log(e);

		if (dragging && containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left - offset.x; // Учитываем смещение
			const y = e.clientY - rect.top - offset.y;
			if (dragging === 'A') {
				setPosition1({x, y});
			} else if (dragging === 'B') {
				setPosition2({x, y});
			}
		}
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	const getPath = () => {
		const controlPointOffset = Math.abs(position1.x - position2.x) * 0.5; // Для плавности
		return `
      M ${position1.x + 100} ${position1.y}
      C ${position1.x + controlPointOffset} ${position1.y},
        ${position2.x - controlPointOffset} ${position2.y},
        ${position2.x} ${position2.y}
    `;
	};

	return (
		<Styled.Wrapper>
			<Styled.Main
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				ref={containerRef}
			>
				<Styled.Block x={position1.x} y={position1.y} onMouseDown={handleMouseDown('A')}>
					<Styled.Text> Text 1</Styled.Text>
				</Styled.Block>

				<Styled.Block x={position2.x} y={position2.y} onMouseDown={handleMouseDown('B')}>
					<Styled.Text> Text 2</Styled.Text>
				</Styled.Block>
				{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
					}}
				>
					<path d={getPath()} stroke="teal" strokeWidth="2" fill="none" />
				</svg>
			</Styled.Main>
		</Styled.Wrapper>
	);
};
