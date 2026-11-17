import axios from 'axios';

import * as styles from './ErrorState.css';

type ErrorStateProps = {error: unknown};

export const ErrorState = ({error}: ErrorStateProps) => {
	let errorMessage = 'Произошла непредвиденная ошибка';

	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		if (status === 404) errorMessage = 'Обсуждение не найдено';
		else if (status === 403) errorMessage = 'У вас нет доступа к этому обсуждению';
		else if (status !== undefined && status >= 500)
			errorMessage = 'Ошибка на стороне сервера. Попробуйте позже';
		else errorMessage = error.response?.data?.message || `Ошибка запроса: ${status}`;
	}

	return (
		<div className={styles.errorState} role="alert">
			{errorMessage}
		</div>
	);
};
