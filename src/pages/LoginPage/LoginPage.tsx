import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom';

import {BASE_URL} from '@/consts/api';
import axios from '@/src/api/axios';
import {useAuth} from '@/store/useAuth';
import {Button} from '@/ui/Button';
import {Input} from '@/ui/Input';
import {TextLink} from '@/ui/TextLink/TextLink';

import * as style from './LoginPage.css';

type Inputs = {username: string; password: string};

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
	} = useForm<Inputs>({mode: 'onChange', defaultValues: {username: '', password: ''}});

	const {isAuth, setUserData} = useAuth();

	const [error, setError] = useState(false);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			const response = await axios.post(`${BASE_URL}/api/auth/login`, data, {
				withCredentials: true,
			});
			setUserData(response.data);
		} catch (_e) {
			setError(true);
		}
	};

	return (
		<div className={style.wrapper}>
			<div className={style.formWarpper}>
				{isAuth && <Navigate to="/" />}
				<form className={style.form} onSubmit={handleSubmit(onSubmit)}>
					<Input
						id="login"
						required
						placeholder={'Логин'}
						error={!!errors.username}
						{...register('username', {required: true})}
					/>
					<Input
						id="password"
						required
						placeholder={'Пароль'}
						error={!!errors.password}
						type="password"
						{...register('password', {required: true})}
					/>

					{error && <div className={style.errorMessage}>Неправильно введена почта или пароль</div>}
					<Button type="submit" disabled={!isValid} fullWidth>
						Войти
					</Button>
				</form>

				<div className={style.footer}>
					Нет аккаунта?
					<TextLink to={'/register'}>Зарегистрируйтесь</TextLink>
				</div>
			</div>
		</div>
	);
};
