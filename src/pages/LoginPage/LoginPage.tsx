import {SubmitHandler, useForm} from 'react-hook-form';
import * as Styled from './LoginPage.styled';
import {useLogin} from '@store/useLogin';
import {useNavigate} from 'react-router-dom';
import {Input} from '@components/Input';
import {Button} from '@components/Button';
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../initFirebase';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';

type Inputs = {
    login: string;
    password: string;
};

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {login: '', password: ''},
    });

    const navigate = useNavigate();

    const {setUserData} = useLogin();

    const [error, setError] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, data.login, data.password);
            })
            .then((userCredential) => {
                const user = userCredential.user;
                setError(false);
                setUserData({email: user.email, userUid: user.uid});
                navigate('/');
            })
            .catch((error) => setError(true));
    };

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                {!!auth.currentUser && <Navigate to="/" />}
                <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        required
                        placeholder={'Логин'}
                        error={!!errors.login}
                        {...register('login', {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                    />
                    <Input
                        {...register('password', {required: true})}
                        error={!!errors.password}
                        required
                        placeholder={'Пароль'}
                        type="password"
                    />

                    {error && <Styled.Error>Неправильно введена почта или пароль</Styled.Error>}
                    <Button type="submit" disabled={!isValid}>
                        Войти
                    </Button>
                </Styled.Form>
            </Styled.FormWrapper>
        </Styled.Wrapper>
    );
};
