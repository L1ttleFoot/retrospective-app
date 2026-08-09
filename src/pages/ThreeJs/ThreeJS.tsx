import {Environment, OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

import {ThreeElement} from './components/Element';
import * as Styled from './ThreeJS.styled';
import {Cylinder} from './components/Cylinder';

export const ThreeJS = () => {
	return (
		<Styled.Wrapper>
			<Styled.Main>
				<Canvas shadows camera={{fov: 60, position: [3, 3, 5]}} gl={{antialias: true}}>
					{/* 1. Цвет фона самой 3D сцены */}
					<color attach="background" args={['#202025']} />

					{/* 2. Освещение */}
					{/* Мягкий свет со всех сторон */}
					<ambientLight intensity={0.4} />

					<directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

					<directionalLight
						castShadow
						position={[5, 10, 5]}
						intensity={1.5}
						shadow-mapSize={[2048, 2048]} // Качество теней
					/>

					{/* 3. Объекты на сцене */}
					{/* Зеленый куб, который отбрасывает тень */}
					{/* <ThreeElement position={[0, 0.5, 0]} color="red" />

					<ThreeElement position={[1, 0.5, 2]} color="teal" />

					<ThreeElement position={[2, 0.5, 4]} color="blue" />

					<ThreeElement position={[3, 0.5, -2]} color="white" />

					<ThreeElement position={[0, 0.5, -4]} color="purple" /> */}

					<Cylinder />

					{/* Плоскость (пол), на которую падает тень */}
					<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
						<planeGeometry args={[10, 10]} />
						<meshStandardMaterial color="#303035" />
					</mesh>

					{/* 4. Интерактив: позволяет крутить и приближать сцену мышкой */}
					<OrbitControls makeDefault enableDamping />
				</Canvas>
			</Styled.Main>
		</Styled.Wrapper>
	);
};
