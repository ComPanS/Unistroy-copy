import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { resetUserData } from '../../redux/slices/auth';

import axios from 'axios';

import styles from './UserInfo.module.scss';
import { Post } from '../../components/Post';

export const UserInfo = ({ fullName, isAdmin, email, createdAt, setActiveCity, activeCity }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { posts, postStatus } = useSelector((state) => state.posts);
    const user = useSelector((state) => state.auth.data);
    const uniqueAddresses = [...new Set(posts.map((obj) => obj.address.split(', ')[0]))];
    const postsLoading = postStatus === 'loading';


    const logout = () => {
        localStorage.removeItem('token');
        dispatch(resetUserData());
        navigate('/');
    };
    return (
        <>
            <div className={styles.user_info_posts}>
                <div className={styles.user_info}>
                    <div className="container">
                        <div className="container_1200">
                            <h2>Профиль</h2>
                            <div className={styles.user_info_content}>
                                <h3>Имя: {fullName}</h3>
                                <h3>Email: {email}</h3>
                                <h3>
                                    Дата регистрации:{' '}
                                    {createdAt ? createdAt.split('T')[0] : 'Не указана'}
                                </h3>
                                <h3>Администратор: {isAdmin ? 'Да' : 'Нет'}</h3>
                                <button onClick={logout}>Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>

                {isAdmin ? (
                    <div className={styles.user_posts}>
                        <div className={styles.complexes}>
                            <div className="container">
                                <div className="container_1200">
                                    <h2>Ваши проекты</h2>
                                    <Link to={'/posts/create'} className={styles.create_post}>Создать</Link>
                                    <div className={styles.list_complexes}>
                                        {posts.map((obj, index) =>
                                            activeCity === obj.address.split(', ')[0] &&
                                            (obj.user ? obj.user._id === user._id : null) ? (
                                                <Post
                                                    key={index}
                                                    {...obj}
                                                    isLoading={postsLoading}
                                                    setActiveCity={setActiveCity}
                                                />
                                            ) : (
                                                ''
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="container_1200">
                                    <div className={styles.other_complexes}>
                                        {uniqueAddresses.map((address, index) => {
                                            const filteredPosts = posts.filter(
                                                (obj) =>
                                                    activeCity !== obj.address.split(', ')[0] &&
                                                    obj.address.split(', ')[0] === address &&
                                                    (obj.user ? obj.user._id === user._id : null)
                                            );

                                            return filteredPosts.length > 0 ? (
                                                <div
                                                    className={styles.other_name_complexes}
                                                    key={index}
                                                >
                                                    <h3>
                                                        Ваши проекты <span>в {address}</span>
                                                    </h3>
                                                    <div className={styles.list_complexes}>
                                                        {filteredPosts.map((obj) => (
                                                            <Post
                                                                {...obj}
                                                                isLoading={postsLoading}
                                                                setActiveCity={setActiveCity}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};
