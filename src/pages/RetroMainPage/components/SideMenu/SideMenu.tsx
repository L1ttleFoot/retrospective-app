import * as Styled from './SideMenu.styled';
import {Button} from '../../../../components/Button';
import {Spacer} from '../../../../components/Spacer';
import {useLogin} from '../../../../store/useLogin';
import {useLocation, useNavigate} from 'react-router-dom';
import {CreateDiscussion} from './CreateDiscassion';
import {DiscussionsList} from './DiscussionsList';
import {useDiscussions} from '../../../../store/useDiscussions';
import {useEffect} from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '../../../../initFirebase';
import {getCurrentUser} from '../../../../utils/getCurrentUser';

export const SideMenu = () => {
    const currentUser = getCurrentUser();

    const navigate = useNavigate();

    const {search} = useLocation();
    const {setCurrentDiscussionId} = useDiscussions();

    const {resetUser, userData} = useLogin();

    const handleLogout = () => {
        resetUser();
        signOut(auth);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    let params = Object.fromEntries(new URLSearchParams(search));

    useEffect(() => {
        if (params.id) {
            setCurrentDiscussionId(params.id);
        }
    }, [params.id, setCurrentDiscussionId]);

    return (
        <Styled.Selector>
            {currentUser && (
                <>
                    <CreateDiscussion />
                    <DiscussionsList />
                </>
            )}
            <Spacer />
            {currentUser && <div>{currentUser?.email}</div>}
            {currentUser ? (
                <Button onClick={handleLogout}>Выйти</Button>
            ) : (
                <Button onClick={handleLogin}>Войти</Button>
            )}
        </Styled.Selector>
    );
};
