import {ToastItemType} from '@/store/useToasts';

import * as style from './Toast.css';

type ToastItemProps = {toast: ToastItemType};

export const ToastItem = ({toast}: ToastItemProps) => {
	return (
		<div className={style.toastCard({type: toast.toastType})}>
			<div className={style.toastMessage}>{toast.message}</div>
			{toast.description && <div className={style.toastDescription}>{toast.description}</div>}
		</div>
	);
};
