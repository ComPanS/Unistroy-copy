import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
    const navigate = useNavigate();
    const { posts, postStatus } = useSelector((state) => state.posts);
    const { id } = useParams();
    const inputFileRef = React.useRef(null);
    const logoInputFileRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [fields, setFields] = React.useState({
        title: '',
        text: '',
        imageUrl: '',
        logo: '',
        address: '',
        threeQuote: '',
    });
    const [threeQuoteError, setThreeQuoteError] = React.useState(false);

    const isEditing = Boolean(id);

    React.useEffect(() => {
        if (id) {
            axios
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    console.log('Fetched post data:', data);
                    setFields(data);
                })
                .catch((err) => {
                    console.warn('Error fetching post:', err);
                    alert('Ошибка при получении статьи');
                });
        }
    }, []);

    const isEmptyFields =
        threeQuoteError ||
        Object.values({
            title: fields.title,
            text: fields.text,
            address: fields.address,
            threeQuote: fields.threeQuote,
        }).some((v) => !v);

    const setFieldValue = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const onChange = React.useCallback((e) => {
        const value = e.target ? e.target.value : e;
        setFieldValue('text', value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        []
    );

    const handleChangeFile = async (e, isLogo = false) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];

            if (!file) return;

            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);

            // Store the URL as returned by the server
            const imageUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
            setFieldValue(isLogo ? 'logo' : 'imageUrl', imageUrl);
            e.target.value = '';
        } catch (e) {
            console.warn('Upload error:', e.response?.data || e);
            alert('Ошибка при загрузке файла');
        }
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            console.log('Submitting fields:', fields);

            const apiMethod = isEditing
                ? axios.patch.bind(this, `/posts/${id}`)
                : axios.post.bind(this, '/posts');

            const imageUrl = fields.imageUrl?.startsWith('http')
                ? fields.imageUrl
                : fields.imageUrl?.startsWith('/uploads/')
                ? fields.imageUrl
                : fields.imageUrl
                ? `/uploads/${fields.imageUrl}`
                : '';

            const logo = fields.logo?.startsWith('http')
                ? fields.logo
                : fields.logo?.startsWith('/uploads/')
                ? fields.logo
                : fields.logo
                ? `/uploads/${fields.logo}`
                : '';

            const postData = {
                ...fields,
                imageUrl,
                logo,
            };

            console.log('Sending data:', postData);

            const { data } = await apiMethod(postData);
            console.log('Response:', data);

            const postId = isEditing ? id : data._id;
            navigate(`/posts/${postId}`);
        } catch (err) {
            console.warn('Error saving post:', err.response?.data || err);
            alert(err.response?.data?.message || 'Ошибка при сохранении статьи');
        } finally {
            setIsLoading(false);
        }
    };

    const validateThreeQuote = (value) => {
        const words = value
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        setThreeQuoteError(words.length !== 3);
        return value;
    };

    return (
        <div className={styles.addpost}>
            <div className="container">
                {fields.imageUrl && (
                    <img
                        className={styles.image}
                        src={
                            fields.imageUrl?.startsWith('http')
                                ? fields.imageUrl
                                : `http://localhost:4444${fields.imageUrl}`
                        }
                        alt=""
                    />
                )}
                <button onClick={() => inputFileRef.current.click()} className={styles.button}>
                    Загрузить превью
                </button>
                <input
                    ref={inputFileRef}
                    hidden
                    type="file"
                    onChange={(e) => handleChangeFile(e, false)}
                />
                {fields.imageUrl && (
                    <button
                        className={`${styles.button} ${styles.buttonError}`}
                        onClick={() => setFieldValue('imageUrl', '')}
                    >
                        Удалить превью
                    </button>
                )}

                <br />
                <br />

                {fields.logo && (
                    <img
                        className={styles.logo}
                        src={
                            fields.logo?.startsWith('http')
                                ? fields.logo
                                : `http://localhost:4444${fields.logo}`
                        }
                        alt="Logo"
                    />
                )}
                <button onClick={() => logoInputFileRef.current.click()} className={styles.button}>
                    Загрузить лого
                </button>
                <input
                    ref={logoInputFileRef}
                    hidden
                    type="file"
                    onChange={(e) => handleChangeFile(e, true)}
                />
                {fields.logo && (
                    <button
                        className={`${styles.button} ${styles.buttonError} ${styles.ml20}`}
                        onClick={() => setFieldValue('logo', '')}
                    >
                        Удалить лого
                    </button>
                )}

                <br />
                <br />
                <input
                    type="text"
                    value={fields.title}
                    onChange={(e) => setFieldValue('title', e.target.value)}
                    className={`${styles.input} ${styles.title}`}
                    placeholder="Заголовок статьи..."
                />
                <input
                    type="text"
                    value={fields.address || ''}
                    onChange={(e) => {
                        console.log('Setting address:', e.target.value);
                        setFieldValue('address', e.target.value);
                    }}
                    className={`${styles.input} ${styles.address}`}
                    placeholder="Адрес"
                />
                <div className={styles.note}>
                    ПРИМЕЧАНИЕ: адрес должен быть указан через запятую. В противном случае адресс
                    статьи будет отображаться некорректно!
                </div>
                <input
                    type="text"
                    value={fields.threeQuote}
                    onChange={(e) => {
                        const value = e.target.value;
                        validateThreeQuote(value);
                        setFieldValue('threeQuote', value);
                    }}
                    className={`${styles.input} ${styles.threeQuote} ${
                        threeQuoteError ? styles.error : ''
                    }`}
                    placeholder="Введите ровно 3 слова"
                />
                {threeQuoteError && <div className={styles.errorText}>Введите ровно 3 слова</div>}
                <textarea
                    className={styles.editor}
                    value={
                        typeof fields.text === 'object' ? JSON.stringify(fields.text) : fields.text
                    }
                    onChange={onChange}
                    options={options}
                />

                <div className={styles.created_modified}>
                    {posts.map((obj, index) => (
                        <div key={index}>
                            {obj._id === id ? (
                                <>
                                    <h4>Создано: {obj.createdAt.split('T')[0]}</h4>{' '}
                                    <h4>Изменено: {obj.updatedAt.split('T')[0]}</h4>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.buttons}>
                    <button
                        onClick={onSubmit}
                        disabled={isEmptyFields}
                        className={`${styles.button} ${styles.buttonContained}`}
                    >
                        {isEditing ? 'Сохранить' : 'Опубликовать'}
                    </button>
                    <Link to="/">
                        <button disabled={isLoading} className={styles.button}>
                            Отмена
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
