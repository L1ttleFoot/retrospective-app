import {SubmitHandler, useForm} from 'react-hook-form';
import * as Styled from './LoginPage.styled';
import {useLogin} from '../../store/useLogin';
import {useNavigate} from 'react-router-dom';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';

type Inputs = {
    login: string;
    password: string;
};

export const LoginPage = () => {
    const {register, handleSubmit, watch} = useForm<Inputs>({
        mode: 'onChange',
        defaultValues: {login: '', password: ''},
    });

    const navigate = useNavigate();

    const {setLogin} = useLogin();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLogin(data.login);
        navigate('/');
    };

    watch(['login', 'password']);

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('login')} required placeholder={'Логин'} />
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
