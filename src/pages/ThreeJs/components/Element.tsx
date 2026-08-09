import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {Mesh} from 'three';

export const ThreeElement = (props: {position: [number, number, number]; color: string}) => {
	const meshRef = useRef<Mesh>();

	const cubeState = useRef({direction: 'right'});

	// useFrame принимает функцию, которая работает каждый кадр
	useFrame((state, delta) => {
		const time = state.clock.getElapsedTime();

		const safeDelta = Math.min(delta, 0.1);

		const speed = 2.0 * safeDelta;

		const mesh = meshRef.current;
		const direction = cubeState.current;
		if (!mesh) return;

		mesh.scale.x = 1 + Math.sin(time * 2) * 0.3;
		mesh.scale.y = 1 + Math.cos(time * 2) * 0.3;

		switch (direction.direction) {
			case 'right':
				mesh.position.x += speed;
				if (mesh.position.x >= 2) {
					direction.direction = 'up';
					return;
				}
				break;
			case 'up':
				mesh.position.y += speed;
				if (mesh.position.y >= 2) {
					direction.direction = 'left';
					return;
				}
				break;
			case 'left':
				mesh.position.x -= speed;
				if (mesh.position.x < 0) {
					direction.direction = 'down';
					return;
				}
				break;
			case 'down':
				mesh.position.y -= speed;
				if (mesh.position.y < 0.5) {
					direction.direction = 'right';
					return;
				}
				break;
		}
	});

	return (
		<mesh ref={meshRef} castShadow position={props.position}>
			<boxGeometry args={[1, 1, 1, 8, 8, 8]} />
			<meshStandardMaterial color={props.color} metalness={0.5} roughness={0.6} />
		</mesh>
	);
};
