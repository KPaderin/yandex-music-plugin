import React from 'react';
import styles from './Login.module.css';
import InputArea from "../../components/InputArea/InputArea";
import useInput from "../../hooks/useInput";
import {useNavigate} from "react-router-dom";
import {YandexMusicApi} from "../../services/yandexMusicApi";

const Login = () => {
    const login = useInput()
    const password = useInput()
    const token = useInput()
    const navigate = useNavigate()

    const api = new YandexMusicApi();

    const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(token.value !== '')
        {
            localStorage.setItem('token', token.value)
            navigate('/main')
        }
        if(password.value !== '' && login.value !== '')
        {
            api.getToken(login.value, password.value)
                .then(res => {
                    if(res.access_token)
                        localStorage.setItem('token', res.access_token)
                    else
                        alert(res.error_description)
                })
        }
        if(localStorage.getItem('token'))
            window.location.reload();
    }
    return (
        <section className={styles.wrap_allDisplay}>
            <article className={styles.wrap__containerForm}>
                <form className={styles.authForm}>
                    <div className={styles.authFrom__logoWrap}>
                        Авторизация доступна только для аккаунтов с отключенной двухфакторной аутентификацией,
                        если у вас такой, то вы можете получить токен вручную по этой ссылке&nbsp;
                        <a href={'https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d'}>
                            yandex oauth</a>&nbsp;и ввести вручную
                        пример ...access_token={'<'}ваш токен>&token_type...
                    </div>
                    <InputArea {...login} placeholder={"Логин"}/>
                    <InputArea {...password} placeholder={"Пароль"} type={"password"}/>
                    <InputArea {...token} placeholder={"Токен(необязательно)"} />
                    <button onClick={clickHandler} className={styles.submitButton}>Вход</button>
                </form>
            </article>
        </section>
    );
};

export default Login;