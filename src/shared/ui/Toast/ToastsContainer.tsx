import {animated, useTransition} from '@react-spring/web';

import {ToastItemType, useToast} from '@/store/useToasts';

import {Portal} from '../Portal';
import * as style from './Toast.css';
import {ToastItem} from './ToastItem';

export const ToastsContainer = () => {
	const toasts = useToast((state) => state.toasts);

	const transitions = useTransition(toasts ?? [], {
		key: (item: ToastItemType) => item.id,
		from: {x: '-20rem', opacity: 0},
		enter: {x: '0rem', opacity: 1},
		leave: {x: '20rem', opacity: 0},
		config: {duration: 300},
	});

	return (
		<Portal portalId="toast-root">
			<div className={style.toastsContainer}>
				{transitions((styles, item) => (
					<animated.div style={styles}>
						<ToastItem toast={item} />
					</animated.div>
				))}
			</div>
		</Portal>
	);
};
