import * as style from './LoadingSpiner.css';

export const LoadingSpiner = () => {
	return (
		<div className={style.wrapper}>
			<div className={style.spinner} />
		</div>
	);
};
