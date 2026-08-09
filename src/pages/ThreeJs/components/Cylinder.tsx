import {Blob} from './Blob';

export const Cylinder = () => {
	return (
		<group position={[0, 0, 0]}>
			<pointLight
				position={[0, 5, 0]}
				intensity={15} // Интенсивность (настройте под себя)
				distance={8} // Как далеко распространяется свет
				color="hotpink" // Цвет свечения лавы
			/>
			<ambientLight intensity={0.4} />

			<mesh position={[0, 11.5, 0]}>
				<cylinderGeometry args={[0.9, 1, 1, 64]} />

				<meshStandardMaterial
					color="#1b2847" // Сверхтемный синий
					roughness={0.6} // Матовая текстура, мягко рассеивает свет
					metalness={0.8}
				/>
			</mesh>

			<mesh position={[0, 7, 0]}>
				<cylinderGeometry args={[1, 2, 8, 64]} />

				<meshPhysicalMaterial
					color="#ffffff"
					roughness={0.05} // Идеально гладкое стекло
					transmission={0.9} // Высокая прозрачность
					thickness={0.5} // Толщина стекла для преломления
					ior={1.5} // Индекс преломления (1.5 — стандарт для стекла)
					transparent
					opacity={0.3}
				/>
			</mesh>

			<mesh position={[0, 3, 0]}>
				<cylinderGeometry args={[1.85, 1.78, 0.2, 32]} />
				<meshStandardMaterial
					color="#e60000"
					emissive="#e60000" // Материал светится сам по себе
					emissiveIntensity={2} // Яркость собственного свечения
					roughness={0.1}
				/>
			</mesh>

			<mesh position={[0, 11, 0]}>
				<cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
				<meshStandardMaterial
					color="#e60000"
					emissive="#e60000" // Материал светится сам по себе
					emissiveIntensity={2} // Яркость собственного свечения
					roughness={0.1}
				/>
			</mesh>

			<mesh position={[0, 2.5, 0]}>
				<cylinderGeometry args={[2, 1, 1, 64]} />

				<meshStandardMaterial
					color="#1b2847" // Сверхтемный синий
					roughness={0.6} // Матовая текстура, мягко рассеивает свет
					metalness={0.8}
				/>
			</mesh>

			<mesh position={[0, 1, 0]}>
				<cylinderGeometry args={[1, 2.5, 2, 64]} />
				<meshStandardMaterial
					color="#1b2847" // Сверхтемный синий
					roughness={0.6} // Матовая текстура, мягко рассеивает свет
					metalness={0.8}
				/>
			</mesh>

			<Blob speed={0.8} delay={0} />

			<Blob speed={0.4} delay={2} />

			<Blob speed={0.4} delay={0.9} />

			<Blob speed={0.3} delay={0.5} />

			<Blob speed={0.8} delay={3} />

			<Blob speed={1} delay={1.5} />

			<Blob speed={0.25} delay={0.6} />

			<Blob speed={0.7} delay={0.7} />
		</group>
	);
};
