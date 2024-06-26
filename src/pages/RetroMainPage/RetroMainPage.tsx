import { useLocation } from 'react-router-dom';
import * as Styled from './RetroMainPage.styled'
import {SideMenu} from "./components/SideMenu";
import {Workspace} from "./components/Workspace";
import { useEffect } from 'react';
import { useDiscassions } from '../../store/useDiscassions';

export const RetroMainPage = () => {
    
    const {search} = useLocation();
    const {setCurrentDiscassionId} = useDiscassions();

    let params = Object.fromEntries(new URLSearchParams(search))

    useEffect(()=>{
        if(params.id){
            setCurrentDiscassionId(params.id)
        }
    },[params.id, setCurrentDiscassionId])

    return (
        <Styled.Wrapper>
            <SideMenu/>
            <Workspace/>
        </Styled.Wrapper>
    )
}