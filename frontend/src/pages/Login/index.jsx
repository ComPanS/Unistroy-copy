import { React, useState } from "react";

import styles from "./Login.module.scss";

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.choice}>
                    <h4
                        onClick={() => {
                            setIsLogin(true);
                        }}
                        className={isLogin ? "" : styles.choice_active}
                    >
                        Авторизация
                    </h4>
                    <h4
                        onClick={() => {
                            setIsLogin(false);
                        }}
                        className={isLogin ? styles.choice_active : ""}
                    >
                        Регистрация
                    </h4>
                    <hr />
                </div>

                {isLogin ? (
                    <form action="" autocomplete="off" key="login">
                        <input
                            type="email"
                            placeholder="Почта"
                            autocomplete="off"
                        />
                        <input
                            type="password"
                            name="password"
                            id="1"
                            placeholder="Пароль"
                            autocomplete="off"
                        />
                        <input type="submit" value="ВОЙТИ" />
                    </form>
                ) : (
                    <form action="" autocomplete="off" key="register">
                        <input
                            type="text"
                            placeholder="Пользователь"
                            autocomplete="off"
                        />
                        <input
                            type="email"
                            placeholder="Почта"
                            autocomplete="off"
                        />
                        <input
                            type="password"
                            name="password"
                            id="1"
                            placeholder="Пароль"
                            autocomplete="off"
                        />
                        <input
                            type="password"
                            name="password2"
                            id="2"
                            placeholder="Подтвердите пароль"
                            autocomplete="off"
                        />
                        <input type="submit" value="ЗАРЕГЕСТРИРОВАТЬСЯ" />
                    </form>
                )}
            </div>
        </>
    );
};
