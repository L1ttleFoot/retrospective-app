//@ts-nocheck
import {useEffect, useRef} from 'react';

export const useDebounce = (func, delay: number) => {
	const timerId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => clearTimeout(timerId.current);
	}, []);

	return (...args) => {
		clearTimeout(timerId.current);
		timerId.current = setTimeout(() => func(...args), delay);
	};
};
