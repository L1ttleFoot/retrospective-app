import {ToastItemType, useToast} from '@/store/useToasts';

import * as Styled from './Toast.styled';
import {ToastItem} from './ToastItem';
import {Portal} from '../Portal';
import {useTransition} from '@react-spring/web';

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
			<Styled.ToastsContainer>
				{transitions((styles, item) => (
					<Styled.AnimatedItemWrapper style={styles}>
						<ToastItem toast={item} />
					</Styled.AnimatedItemWrapper>
				))}
			</Styled.ToastsContainer>
		</Portal>
	);
};
