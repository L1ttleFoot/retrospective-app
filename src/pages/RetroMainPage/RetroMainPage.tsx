import * as Styled from './RetroMainPage.styled'
import {SideMenu} from "./components/SideMenu";
import {Workspace} from "./components/Workspace";

export const RetroMainPage = () => {

    return (
        <Styled.Wrapper>
            <SideMenu/>
            <Workspace/>
        </Styled.Wrapper>
    )
}