import * as Styled from './SideMenu.styled';
import {Button} from '../../../../components/Button';
import {Spacer} from '../../../../components/Spacer';
import {useLogin} from '../../../../store/useLogin';
import {useNavigate} from 'react-router-dom';
import {CreateDiscassion} from './CreateDiscassion';
import {DiscassionsList} from './DiscassionsList';

export const SideMenu = () => {
    
    const navigate = useNavigate();
    const {resetUser, isLoggedIn} = useLogin();

    const handleLogout = () => {
        resetUser();
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Styled.Selector>
            {isLoggedIn && (
                <>
                    <CreateDiscassion />
                    <DiscassionsList />
                </>
            )}
            <Spacer />
            {isLoggedIn ? 
                <Button onClick={handleLogout}>Выйти</Button>
             : (
                <Button onClick={handleLogin}>Войти</Button>
            )}
        </Styled.Selector>
    );
};
