import {Chart} from '@src/pages/TestPage/Chart';
import {AppBar} from '@src/widgets/AppBar';
import * as Styled from './TestPage.styled';

export const Test = () => {
    return (
        <Styled.Wrapper>
            <AppBar />
            <Styled.Test>
                <Chart />
            </Styled.Test>
        </Styled.Wrapper>
    );
};
