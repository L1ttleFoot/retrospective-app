import {SubmitHandler, useForm} from 'react-hook-form';
import * as Styled from './LoginPage.styled';
import {useAuth} from '@store/useAuth';
import {useNavigate} from 'react-router-dom';
import {Input} from '@ui/Input';
import {Button} from '@ui/Button';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import axios from '@src/api/axios';
import {BASE_URL} from '@consts/api';
import {TextLink} from '@ui/TextLink/TextLink';

type Inputs = {
    username: string;
    password: string;
};

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {username: '', password: ''},
    });

    const navigate = useNavigate();

    const {isAuth, setUserData} = useAuth();

    const [error, setError] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, data, {
                withCredentials: true,
            });
            setUserData(response.data);
        } catch (e) {
            setError(true);
        }
    };

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                {isAuth && <Navigate to="/" />}
                <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        required
                        placeholder={'Логин'}
                        error={!!errors.username}
                        {...register('username', {
                            required: true,
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

                <Styled.Footer>
                    Нет аккаунта?
                    <TextLink to={'/register'}>Зарегистрируйтесь</TextLink>
                </Styled.Footer>
            </Styled.FormWrapper>
        </Styled.Wrapper>
    );
};
