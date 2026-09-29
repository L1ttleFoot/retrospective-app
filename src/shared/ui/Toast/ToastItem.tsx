import {ToastItemType} from '@/store/useToasts';

import * as Styled from './Toast.styled';

type ToastItemProps = {toast: ToastItemType};

export const ToastItem = ({toast}: ToastItemProps) => {
	return (
		<Styled.ToastCard $type={toast.toastType}>
			<Styled.ToastMessage>{toast.message}</Styled.ToastMessage>
		</Styled.ToastCard>
	);
};
