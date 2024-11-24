import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../../redux/slices/posts";
import { Link } from "react-router-dom";

import { Post } from "../../components/Post";
import axios from "../../axios";

import styles from "./Posts.module.scss";

export const Posts = ({ activeCity }) => {
    const { posts, postStatus } = useSelector((state) => state.posts);
    const postsLoading = postStatus === 'loading';
    const dispatch = useDispatch();
    const uniqueAddresses = [...new Set(posts.map((obj) => obj.address.split(', ')[0]))];

    React.useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className={styles.all_posts}>
            <div className="container">
                <div className="container_1200">
                    <div className="path_site_black">
                        <Link to={'/'} className="path_to">
                            Главная
                        </Link>
                        <p className="path_to">Наши проекты</p>
                    </div>
                </div>
            </div>

            <div className={styles.complexes}>
                <div className="container">
                    <div className="container_1200">
                        <div className={styles.list_complexes}>
                            {posts.map((obj, index) =>
                                activeCity === obj.address.split(', ')[0] ? (
                                    <Post key={index} {...obj} isLoading={postsLoading} />
                                ) : (
                                    console.log(window.actCity)
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
                                        obj.address.split(', ')[0] === address
                                );

                                return filteredPosts.length > 0 ? (
                                    <div className={styles.other_name_complexes} key={index}>
                                        <h3>
                                            Наши проекты <span>в {address}</span>
                                        </h3>
                                        <div className={styles.list_complexes}>
                                            {filteredPosts.map((obj) => (
                                                <Post {...obj} isLoading={postsLoading} />
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
    );
};
