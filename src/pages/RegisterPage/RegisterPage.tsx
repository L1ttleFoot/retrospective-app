import {AxiosError} from 'axios';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {BASE_URL} from '@/consts/api';
import axios from '@/src/api/axios';
import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';
import {TextLink} from '@/ui/TextLink/TextLink';

import * as Styled from './RegisterPage.styled';

type RegisterInputs = {username: string; password: string; confirmPassword: string};

export const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		watch,
	} = useForm<RegisterInputs>({
		mode: 'onChange',
		defaultValues: {username: '', password: '', confirmPassword: ''},
	});

	const [error, setError] = useState<{error: string | undefined}>({error: undefined});

	const errorsMessages = Object.values(errors);

	const onSubmit: SubmitHandler<RegisterInputs> = async ({username, password}) => {
		try {
			await axios.post(`${BASE_URL}/api/register`, {username, password});
		} catch (e) {
			if ((e as AxiosError).response?.data) {
				setError(
					((e as AxiosError).response?.data as {error: string | undefined}) || {
						error: 'Произошла ошибка',
					},
				);
			} else {
				setError({error: 'Произошла неизвестная ошибка'});
			}
		}
	};

	return (
		<Styled.Wrapper>
			<Styled.FormWrapper>
				<Styled.Form onSubmit={handleSubmit(onSubmit)}>
					<Input
						required
						placeholder={'Логин'}
						error={!!errors.username}
						{...register('username', {required: true})}
					/>
					<Input
						{...register('password', {required: true})}
						error={!!errors.password}
						required
						placeholder={'Пароль'}
						type="password"
					/>
					<Input
						{...register('confirmPassword', {
							required: true,
							validate: (value) => value === watch('password') || 'Пароли не совпадают',
						})}
						error={!!errors.confirmPassword}
						required
						placeholder={'Повторите пароль'}
						type="password"
					/>

					{error && <Styled.Error>{error.error}</Styled.Error>}
					{!!errorsMessages.length &&
						errorsMessages.map((error) => (
							<Styled.Error key={error.message}>{error.message}</Styled.Error>
						))}
					<Button type="submit" disabled={!isValid}>
						Создать аккаунт
					</Button>
				</Styled.Form>

				<Styled.Footer>
					Уже есть аккаунт? <TextLink to={'/login'}>Войти</TextLink>
				</Styled.Footer>
			</Styled.FormWrapper>
		</Styled.Wrapper>
	);
};
