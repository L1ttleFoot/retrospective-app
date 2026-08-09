import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {Mesh} from 'three';

export const Blob = ({speed = 1, delay = 0, minY = 3.0, maxY = 10.5}) => {
	const blobRef = useRef<Mesh>(null);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Добавляем delay к времени, чтобы капли двигались несинхронно
		// Math.sin дает значение от -1 до 1
		const rawSin = Math.sin(time * speed + delay);

		// Переводим значение из диапазона [-1, 1] в диапазон [0, 1]
		const normalizedSin = (rawSin + 1) / 2;

		if (blobRef.current) {
			// Интерполяция: капля строго зажата между minY и maxY
			blobRef.current.position.y = minY + normalizedSin * (maxY - minY);

			// Небольшое покачивание влево-вправо (X) и вперед-назад (Z), чтобы полет был хаотичным
			blobRef.current.position.x = Math.cos(time * speed * 0.5 + delay) * 0.5;
			blobRef.current.position.z = Math.sin(time * speed * 0.7 + delay) * 0.4;
		}
	});

	return (
		<mesh ref={blobRef}>
			<sphereGeometry args={[0.45, 32, 32]} />
			<meshStandardMaterial
				color="#e60000"
				emissive="#e60000"
				emissiveIntensity={2}
				roughness={0.1}
			/>
		</mesh>
	);
};
