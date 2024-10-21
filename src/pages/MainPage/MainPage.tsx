import {onAuthStateChanged} from 'firebase/auth';
import {useEffect} from 'react';
import {auth} from '../../initFirebase';
import * as Styled from './MainPage.styled';
import {Board} from './components/Board';
import {useLogin} from '@store/useLogin';
import {AppBar} from './components/AppBar/AppBar';

export const MainPage = () => {
    const {setUserData} = useLogin();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
            setUserData({email: user?.email, userUid: user?.uid}),
        );
        return unsubscribe;
    }, [setUserData]);

    return (
        <Styled.Wrapper>
            <AppBar />
            <Styled.Main>
                <Board />
            </Styled.Main>
        </Styled.Wrapper>
    );
};
