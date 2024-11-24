import React, { useState, useEffect, useRef, act } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material/Button';

import styles from './Header.module.scss';

import { fetchPosts } from '../../redux/slices/posts';

import logo from '../../media/logo/logo.png';
import user from '../../media/header/auth-like-menu/user.png';
import like from '../../media/header/auth-like-menu/like.png';
import menu from '../../media/header/auth-like-menu/menu.png';
import down_arrow from '../../media/header/down-arrow.png';

export const HeaderTop = ({ activeCity, setActiveCity, headerRef }) => {
    const isAuth = false;

    const location = useLocation();

    const onClickLogout = () => {};

    // const [activeCity, setActiveCity] = useState("Казань");
    // ActiveCity(activeCity);

    const [isOpen, setIsOpen] = useState(false); // Состояние для отслеживания открытия/закрытия меню

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Переключение состояния открытия/закрытия
    };

    const { posts, postStatus } = useSelector((state) => state.posts);
    const postsLoading = postStatus === 'loading';
    const dispatch = useDispatch();

    const uniqueAddresses = [...new Set(posts.map((obj) => obj.address.split(', ')[0]))];

    const navigate = useNavigate();
    const handleLinkClick = (id) => {
        navigate('/');
        // console.log(id);
        navigate(`/posts/${id}`);
    };

    React.useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <section className={styles.header_top} ref={headerRef}>
            <section className={styles.logo_nav}>
                <Link to={'/'}>
                    <img src={logo} alt="logo" />
                </Link>
                <nav>
                    <div className={styles.nav_link}>
                        <Link
                            to="/posts/"
                            className={location.pathname.includes('posts') ? styles.green : ''}
                        >
                            Проекты
                        </Link>
                        <ul>
                            {posts.map((obj, index) =>
                                activeCity === obj.address.split(', ')[0] ? (
                                    <li key={index}>
                                        <Link
                                            to={`/posts/${obj._id}`}
                                            onClick={() => handleLinkClick(obj._id)}
                                        >
                                            <div className={styles.project_logo}>
                                                <img src={obj.logo} alt="" />
                                            </div>
                                            {obj.title}
                                            <div className={styles.landscape}>
                                                <img src={obj.imageUrl} alt="" />
                                            </div>
                                        </Link>
                                    </li>
                                ) : (
                                    ''
                                )
                            )}
                        </ul>
                    </div>

                    <div className={styles.nav_link}>
                        <a href="#">Поиск квартир</a>
                        <ul>
                            <li>
                                <a href="#">По параметрам</a>
                            </li>
                            <li>
                                <a href="#">По преимуществам</a>
                            </li>
                            <li>
                                <a href="#">Машиноместа</a>
                            </li>
                            <li>
                                <a href="#">Кладовые</a>
                            </li>
                            <li>
                                <a href="#">Частные дома</a>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.nav_link}>
                        <a href="#">Способы покупки</a>
                        <ul>
                            <li>
                                <a href="#">Ипотека</a>
                            </li>
                            <li>
                                <a href="#">Trade-in</a>
                            </li>
                            <li>
                                <a href="#">Рассрочка</a>
                            </li>
                            <li>
                                <a href="#">Лизинг</a>
                            </li>
                            <li>
                                <a href="#">Военная ипотека</a>
                            </li>
                            <li>
                                <a href="#">Материнский капитал</a>
                            </li>
                            <li>
                                <a href="#">Online - сервисы</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#">Контакты</a>
                    <a href="#" className={styles.tour}>
                        Тур
                    </a>
                </nav>
            </section>
            <section className={styles.header_inf}>
                <div className={styles.city_tel}>
                    <div className={styles.choose_city} onClick={toggleMenu}>
                        <p>{activeCity}</p>
                        <img src={down_arrow} alt="" className={isOpen ? styles.arrow_rev : ''} />
                        {isOpen && (
                            <ul>
                                <li>
                                    <Link>{activeCity}</Link>
                                </li>
                                {uniqueAddresses.map((obj, index) =>
                                    activeCity === obj ? (
                                        ''
                                    ) : (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setActiveCity(obj);
                                            }}
                                        >
                                            <Link>{obj}</Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                    <div className={styles.tel}>
                        <a href="#">+7 843 207-19-80</a>
                        <a href="#">Заказать звонок</a>
                    </div>
                </div>
                <div className={styles.auth_like_menu}>
                    <Link to="/auth">
                        <img src={user} alt="" />
                    </Link>
                    <a href="#">
                        <img src={like} alt="" />
                    </a>
                    <div className={styles.menu}>
                        <a href="#">
                            <img src={menu} alt="" />
                            МЕНЮ
                        </a>
                    </div>
                </div>
            </section>
        </section>
    );
};
