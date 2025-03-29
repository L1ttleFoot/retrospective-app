import * as Styled from './MainPage.styled';
import {AppBar} from '@src/widgets/AppBar';
import {Board} from '@src/widgets/Board';

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
