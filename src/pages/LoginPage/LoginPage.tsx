import {SubmitHandler, useForm} from 'react-hook-form';
import * as Styled from './LoginPage.styled';
import {useLogin} from '../../store/useLogin';
import {useNavigate} from 'react-router-dom';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../initFirebase';
import {Navigate} from 'react-router-dom';

type Inputs = {
    login: string;
    password: string;
};

export const LoginPage = () => {
    const {register, handleSubmit} = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {login: '', password: ''},
    });

    const navigate = useNavigate();

    const {setUserData} = useLogin();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, data.login, data.password);
            })
            .then((userCredential) => {
                const user = userCredential.user;

                setUserData({email: user.email, userUid: user.uid});
                navigate('/');
            })
            .catch((error) => console.log(error));
    };

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                {!!auth.currentUser && <Navigate to="/" />}
                <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                    <Input required placeholder={'Логин'} {...register('login')} />
                    <Input
                        {...register('password')}
                        required
                        placeholder={'Пароль'}
                        type="password"
                    />
                    <Button type="submit">Войти</Button>
                </Styled.Form>
            </Styled.FormWrapper>
        </Styled.Wrapper>
    );
};
