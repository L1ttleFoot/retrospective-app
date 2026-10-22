import {TextLink} from '@/ui/TextLink/TextLink';

import * as styles from './NotFoundPage.css';

export const NotFoundPage = () => {
	return (
		<div className={styles.notFoundPage}>
			<h1>404 - Not Found</h1>
			<p>Страница не найдена.</p>
			<TextLink to={'/'}>На основную страницу</TextLink>
		</div>
	);
};
