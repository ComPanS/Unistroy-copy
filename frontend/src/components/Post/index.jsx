import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import axios from '../../axios';

import bg1 from '../../media/bg-img/Sun-min.jpg';

import styles from './Post.module.scss';
import { removePost } from '../../redux/slices/posts';

export const Post = ({
    _id,
    title,
    imageUrl,
    address,
    createdAt,
    updatedAt,
    text,
    isLoading,
    isFullPost,
    logo,
    threeQuote,
    activeCity,
    setActiveCity,
    user,
}) => {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        let formattedValue = '+7 (';

        if (value.length > 1) {
            formattedValue += value.substring(1, 4);
        }
        if (value.length >= 5) {
            formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formattedValue += '-' + value.substring(9, 11);
        }

        setPhone(formattedValue);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user_authed = useSelector((state) => state.auth.data);

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

    const visible = [visible1, visible2, visible3, setVisible4];

    const onClickRemove = async () => {
        try {
            if (window.confirm('Вы действительно хотите удалить?')) {
                dispatch(removePost(_id));
                axios.delete('/posts/' + _id);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            alert('Ошибка при получении статьи');
        }
    };

    useEffect(() => {
        // console.log('Component mounted');
        if (address && isFullPost) {
            setActiveCity(address.split(', ')[0]);
        }
        // Сброс состояния видимости
        setVisible1(false);
        setVisible2(false);
        setVisible3(false);
        setVisible4(false);

        // Создаем ссылки для хранения идентификаторов таймеров
        const timers = [];

        // Устанавливаем таймеры
        timers.push(
            setTimeout(() => {
                setVisible1(true);
            }, 500)
        );
        timers.push(
            setTimeout(() => {
                setVisible2(true);
            }, 700)
        );
        timers.push(
            setTimeout(() => {
                setVisible3(true);
            }, 900)
        );
        timers.push(
            setTimeout(() => {
                setVisible4(true);
            }, 2200)
        );

        // Очистка таймеров при размонтировании
        return () => {
            // console.log('Clearing timers');
            timers.forEach(clearTimeout);
        };
    }, [_id]);

    if (isLoading) {
        return '';
    }

    return (
        <>
            {isFullPost ? (
                <div className={styles.fullPost}>
                    <div className={styles.main_img}>
                        <img
                            src={
                                imageUrl?.startsWith('http')
                                    ? imageUrl
                                    : `http://localhost:4444${imageUrl}`
                            }
                            alt=""
                        />
                        <div className="container">
                            <div className="container_1200">
                                <div className={styles.desc}>
                                    <div className="path_site_white">
                                        <Link to={'/'} className="path_to">
                                            Главная
                                        </Link>
                                        <Link to={'/posts/'} className="path_to">
                                            Проекты
                                        </Link>
                                        <p className="path_to">{title}</p>
                                    </div>
                                    <h3>{title}</h3>
                                </div>
                            </div>
                        </div>
                        {threeQuote ? (
                            <div className={visible4 ? styles.threeQuote_af : styles.threeQuote_bf}>
                                {threeQuote.split(' ').map((item, index) => (
                                    <div
                                        key={index}
                                        className={
                                            visible[index] ? styles.quote_af : styles.quote_bf
                                        }
                                    >
                                        <h4>{item}</h4>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className={styles.name_desc}>
                        <div className="container container_1200">
                            {console.log(user_authed,"jjj", user)}
                            {user_authed._id === user ? (
                                <>
                                    <div className={styles.edit_remove}>
                                        <Link to={`/posts/${_id}/edit`}>Изменить</Link>
                                        <button onClick={onClickRemove}>Удалить</button>
                                    </div>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <div className={styles.order_consultation}>
                        <div className="container">
                            <div className={styles.desc_form}>
                                <div className={styles.desc}>
                                    <h3>Закажите консультацию</h3>
                                    <p>Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
                                </div>

                                <form>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        placeholder="Ваше имя"
                                    />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Ваш номер телефона"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        maxLength="18"
                                        required
                                    />
                                    <div className={styles.btn_rules}>
                                        <button type="submit">
                                            <p>Отправить заявку</p>
                                            <p>→</p>
                                        </button>
                                        <p>
                                            Нажимая на кнопку, Вы подтверждаете, что ознакомились с{' '}
                                            <span className="green_underline">
                                                <a href="">Политикой конфиденциальности</a>
                                            </span>{' '}
                                            компании и даете свое{' '}
                                            <span className="green_underline">
                                                <a href="">
                                                    согласие на обработку персональных данных
                                                </a>
                                            </span>{' '}
                                            и{' '}
                                            <span className="green_underline">
                                                <a href="">
                                                    согласие на обработку персональных данных для
                                                    распространения
                                                </a>
                                            </span>
                                            .
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className={styles.block_img_btn_desc}>
                        <div className="container">
                            <div className={styles.desc_btn}>
                                <div className={styles.desc}>
                                    <h3>Движение солнца</h3>
                                    <p>
                                        Взгляните как солнечные лучи будут попадать в окна
                                        <br />
                                        Вашей квартиры в разное время года
                                    </p>
                                </div>
                                <button>
                                    <p>Смотреть движение солнца</p>
                                    <p>→</p>
                                </button>
                            </div>
                        </div>
                        <img src={bg1} alt="" />
                    </div>

                    <div className={styles.order_consultation}>
                        <div className="container">
                            <div className={styles.desc_form}>
                                <div className={styles.desc}>
                                    <h3>Остались вопросы?</h3>
                                    <p>Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
                                </div>

                                <form>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        placeholder="Ваше имя"
                                    />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Ваш номер телефона"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        maxLength="18"
                                        required
                                    />
                                    <div className={styles.btn_rules}>
                                        <button type="submit">
                                            <p>Отправить заявку</p>
                                            <p>→</p>
                                        </button>
                                        <p>
                                            Нажимая на кнопку, Вы подтверждаете, что ознакомились с{' '}
                                            <span className="green_underline">
                                                <a href="">Политикой конфиденциальности</a>
                                            </span>{' '}
                                            компании и даете свое{' '}
                                            <span className="green_underline">
                                                <a href="">
                                                    согласие на обработку персональных данных
                                                </a>
                                            </span>{' '}
                                            и{' '}
                                            <span className="green_underline">
                                                <a href="">
                                                    согласие на обработку персональных данных для
                                                    распространения
                                                </a>
                                            </span>
                                            .
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className={styles.block_img_btn_desc_2}>
                        <div className="container">
                            <div className={styles.desc_btn}>
                                <div className={styles.desc}>
                                    <h2>
                                        Узнайте больше о проекте
                                        <br />
                                        {title}
                                    </h2>
                                    <p>Переходите на официальный сайт проекта</p>
                                </div>
                                <button>
                                    <p>Перейти на сайт</p>
                                    <p>→</p>
                                </button>
                            </div>
                        </div>
                        <img
                            src={
                                imageUrl?.startsWith('http')
                                    ? imageUrl
                                    : `http://localhost:4444${imageUrl}`
                            }
                            alt={title}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.complexe}>
                    <Link to={`/posts/${_id}`}>
                        {imageUrl && (
                            <img
                                src={
                                    imageUrl?.startsWith('http')
                                        ? imageUrl
                                        : `http://localhost:4444${imageUrl}`
                                }
                                alt={title}
                            />
                        )}
                        <div className={styles.desc_statuses}>
                            <div className={styles.statuses}>
                                <p>видеообзор</p>
                                <p>online</p>
                            </div>
                            <div className={styles.desc}>
                                <h3>{title}</h3>
                                <p>{address}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};
