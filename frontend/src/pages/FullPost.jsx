import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Post } from '../components/Post';
import axios from '../axios';
import { useParams } from 'react-router-dom';

export const FullPost = ({ activeCity, setActiveCity }) => {
    const [data, setData] = React.useState();
    const { id } = useParams();
    const user = useSelector((state) => state.auth.data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/posts/${id}`);
                setData(data);
            } catch (err) {
                alert('Ошибка при получении статьи');
                console.warn(err);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Post
                {...data}
                isLoading={!data}
                isFullPost
                setActiveCity={setActiveCity}
                activeCity={activeCity}
            />
        </>
    );
};
