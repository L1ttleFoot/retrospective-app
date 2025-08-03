import {TextLink} from '@/ui/TextLink/TextLink';

import * as Styled from './NotFoundPage.styled';

export const NotFoundPage = () => {
	return (
		<Styled.NotFoundPage>
			<h1>404 - Not Found</h1>
			<p>Страница не найдена.</p>
			<TextLink to={'/'}>На основную страницу</TextLink>
		</Styled.NotFoundPage>
	);
};
