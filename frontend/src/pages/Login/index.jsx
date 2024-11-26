import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { setUserData } from '../../redux/slices/auth';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = async (fields) => {
        try {
            const { data } = await axios.post('/auth/login', fields);
            dispatch(setUserData(data));
            window.localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.log(error);
            if (error.isAxiosError) {
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((obj) => {
                        setError(
                            obj.param,
                            {
                                message: obj.msg,
                            },
                            { shouldFocus: true }
                        );
                    });
                }
                if (error.response.data.message) {
                    setError(
                        'password',
                        { message: error.response.data.message },
                        { shouldFocus: true }
                    );
                }
            }
        }
    };

    const onRegister = async (fields) => {
        try {
            const { data } = await axios.post('/auth/register', fields);
            dispatch(setUserData(data));
            window.localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
                setError('email', {
                    type: 'manual',
                    message: error.response.data.message
                });
            }
        }
    };

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.choice}>
                    <h4
                        onClick={() => {
                            setIsLogin(true);
                        }}
                        className={isLogin ? '' : styles.choice_active}
                    >
                        Авторизация
                    </h4>
                    <h4
                        onClick={() => {
                            setIsLogin(false);
                        }}
                        className={isLogin ? styles.choice_active : ''}
                    >
                        Регистрация
                    </h4>
                    <hr />
                </div>

                {isLogin ? (
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" key="login">
                        <input
                            type="email"
                            placeholder="Почта"
                            autoComplete="off"
                            {...register('email', {
                                required: 'Укажите почту',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Неверный формат email'
                                }
                            })}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                        
                        <input
                            type="password"
                            placeholder="Пароль"
                            autoComplete="off"
                            {...register('password', {
                                required: 'Укажите пароль',
                                minLength: {
                                    value: 5,
                                    message: 'Пароль должен быть не менее 5 символов'
                                }
                            })}
                        />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                        
                        <input 
                            type="submit" 
                            value="ВОЙТИ"
                            disabled={!isValid} 
                        />
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onRegister)} autoComplete="off" key="register">
                        <input
                            type="text"
                            placeholder="Пользователь"
                            autoComplete="off"
                            {...register('fullName', {
                                required: 'Укажите имя пользователя',
                                minLength: {
                                    value: 3,
                                    message: 'Имя должно быть не менее 3 символов'
                                }
                            })}
                        />
                        {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}

                        <input
                            type="email"
                            placeholder="Почта"
                            autoComplete="off"
                            {...register('email', {
                                required: 'Укажите почту',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Неверный формат email'
                                }
                            })}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                        <input
                            type="password"
                            placeholder="Пароль"
                            autoComplete="new-password"
                            {...register('password', {
                                required: 'Укажите пароль',
                                minLength: {
                                    value: 5,
                                    message: 'Пароль должен быть не менее 5 символов'
                                }
                            })}
                        />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

                        <input
                            type="password"
                            placeholder="Подтвердите пароль"
                            autoComplete="new-password"
                            {...register('password2', {
                                required: 'Подтвердите пароль',
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return 'Пароли не совпадают';
                                    }
                                }
                            })}
                        />
                        {errors.password2 && <span className={styles.error}>{errors.password2.message}</span>}

                        <input
                            type="submit"
                            value="ЗАРЕГИСТРИРОВАТЬСЯ"
                            disabled={!isValid}
                        />
                    </form>
                )}
            </div>
        </>
    );
};
