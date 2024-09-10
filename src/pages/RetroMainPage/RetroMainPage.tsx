import {onAuthStateChanged} from 'firebase/auth';
import {useEffect} from 'react';
import {auth} from '../../initFirebase';
import * as Styled from './RetroMainPage.styled';
import {SideMenu} from './components/SideMenu';
import {Workspace} from './components/Workspace';
import {useLogin} from '../../store/useLogin';

export const RetroMainPage = () => {
    const {setUserData} = useLogin();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
            setUserData({email: user?.email, userUid: user?.uid}),
        );
        return unsubscribe;
    }, [setUserData]);

    return (
        <Styled.Wrapper>
            <SideMenu />
            <Workspace />
        </Styled.Wrapper>
    );
};
