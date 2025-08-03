import {AppBar} from '@/src/widgets/AppBar';
import {Board} from '@/src/widgets/Board';

import * as Styled from './MainPage.styled';

export const MainPage = () => {
	return (
		<Styled.Wrapper>
			<AppBar />
			<Styled.Main>
				<Board />
			</Styled.Main>
		</Styled.Wrapper>
	);
};
