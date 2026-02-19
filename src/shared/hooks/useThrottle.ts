//@ts-nocheck

export const useThrottle = (func, delay: number, ctx?) => {
	let timerId = null;
	let lastArgs = null;

	const runFunc = (args) => {
		func.apply(ctx, args);

		timerId = setTimeout(() => {
			timerId = null;
			if (lastArgs) {
				runFunc(lastArgs);
				lastArgs = null;
			}
		}, delay);
	};

	/* const startTimer = () => {
		timerId = setTimeout(() => {
			timerId = null;
			if (lastArgs) {
				runFunc(lastArgs);
				lastArgs = null;
			}
		}, delay);
	}; */

	return (...args) => {
		if (!timerId) {
			runFunc(args);
		} else {
			lastArgs = args;
		}
	};
};
