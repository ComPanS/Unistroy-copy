import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Основные стили
import 'swiper/css/effect-fade'; // Стили для эффекта fade
import { EffectFade, Autoplay } from 'swiper/modules'; // Импорт модулей эффекта fade и пагинации

import { Post } from '../Post';
import { fetchPosts } from '../../redux/slices/posts';

import styles from './LandingMain.module.scss';

import place from '../../media/about-company/25place.svg';
import team from '../../media/about-company/team.jpg';

import bg1 from '../../media/bg-img/house.jpg';
import bg2 from '../../media/bg-img/interior.jpg';
import bg3 from '../../media/bg-img/long-house.jpg';
import intro1 from '../../media/intro/intro-img1.jpg';
import intro2 from '../../media/intro/intro-img2.jpg';
import arrow_right_up from '../../media/intro/diagonal-arrow-right-up.svg';
import uni1 from '../../media/unistroim-goroda/img1.jpg';
import uni2 from '../../media/unistroim-goroda/img2.jpg';
import uni3 from '../../media/unistroim-goroda/img3.jpg';
import excursionimg from '../../media/order-excursion/excursion.jpg';
import asd from '../../media/img.png';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: 'Что такое React?',
            answer: [
                'Компания «Унистрой» - федеральный девелопер с 26-летним опытом и безупречной репутацией. Мы строим в 6 субъектах России (Татарстан, Самарская область, Башкортостан, Пермский край, Санкт-Петербург)',
                'Девелопер занимает 1 место в России по скорости строительства,** входит в ТОП-25 застройщиков России и является несменным лидером Татарстана по вводу жилья.*** Также наша компания является обладателем 5 звезд Единого ресурса застройщиков за соблюдение сроков строительства: мы всегда сдаем дома в срок и даже раньше.****',
                'Гарантии сохранения денежных средств клиентов предусмотрена Федеральным законом №214: до ввода дома в эксплуатацию, все денежные средства перечисленные в качестве оплаты за приобретенную недвижимость хранятся в банке на специальном эскроу-счете, открытым на имя клиента, и являются неприкосновенными.',
                ' **ЕРЗ РФ, https://erzrf.ru/top-zastroyshchikov/rf?topType=3&date=220501',
                '*** ЕРЗ РФ, https://erzrf.ru/top-zastroyshchikov/rf?topType=1&date=2021&page=2',
                '*** ЕРЗ РФ, https://erzrf.ru/novostroyki?region=respublika-tatarstan-tatarstan&regionKey=145204001&costType=1&organizationId=1130405001&sortType=cmxrating',
            ],
        },
        {
            question: 'Где я могу получить информацию о ходе строительства?',
            answer: [
                'За ходом строительства наши клиенты могут наблюдать через онлайн-камеры, размещенные на сайте компании, промо-сайтах объектов и в мобильном приложении “Унистрой”. В разделе “История строительства” можно оценить темпы возведения дома с помощью видео в технологии таймлапс. Также, 1 раз в квартал на нашем канале Youtube появляется отчетный ролик с детальным облетом по всей территории строительной площадки.',
            ],
        },
        {
            question: 'Как я могу попасть на экскурсию в ЖК?',
            answer: [
                'Экскурсии в ЖК “Весна”, “Лето”, “Царево Village”, “Южный бульвар” проводятся каждый день по предварительной записи.',
                'Записаться на экскурсии можно по телефона unistroyrf.ru/contacts/',
            ],
        },
        {
            question:
                'Как я узнаю о завершении строительства своего дома и какие мои дальнейшие действия?',
            answer: [
                'После ввода дома в эксплуатацию клиенты получают push-уведомление через мобильное приложение компании “Унистрой”. Для этого нужно скачать его в AppStore или GooglePlay и авторизоваться по номеру телефона, указанному в договоре. ',
                'Также, клиентам, имеющим подтвержденную учетную запись на Госуслугах, приходит уведомление в личный кабинет. Если у клиента нет подтвержденной учетной записи на портале, отправляются заказные письма с уведомлением Почтой России по адресу, указанному клиентом, как почтовый. ',
                'После получения уведомления, клиенты могут записаться на приемку квартиры в удобное ему время через мобильное приложение компании “Унистрой”. ',
            ],
        },
        {
            question:
                'Как я узнаю о завершении строительства своего дома и какие мои дальнейшие действия?',
            answer: [
                'Как только ваш дом получает разрешение на ввод в эксплуатацию и начнется передача квартир, мы оповестим вас заказным письмом по адресу, указанному в договоре или, при наличии записи на госуслугах, вам придет оповещение в мобильном приложении. Также информация о начале передачи квартир выходит на сайте и в соцсетях компании. Для приема квартиры вам необходимо записаться через мобильное приложение и выбрать удобный день и время. За дня до начала передачи всех собственников обзванивает наш call-центр. ',
            ],
        },
        {
            question:
                'В какой момент я могу приступить к регистрации права собственности на квартиру?',
            answer: [
                'После подписания акта-приема передачи на квартиру. Вы можете зарегистрировать право собственности самостоятельно или воспользоваться услугой наших специалистов. ',
                'Если вы подписывали дополнительные соглашения к договору – возьмите и их, если покупали квартиру по договору уступки права требования – договор уступки, если в ипотеку – закладную, которую можно взять у банка. ',
                'Вы можете передать документы специалистам в любом из офисов продаж компании «Унистрой». Мы подадим их в МФЦ и привезем готовые документы вам курьером в любое удобное место и время. Быстро, удобно и без очередей. Стоимость регистрации права собственности: 1 500 руб. ',
            ],
        },
    ];

    return (
        <div className={styles.faq}>
            <div className="container">
                <div className="container_1200">
                    <h3>Ответы на ваши вопросы</h3>
                    <div className={styles.faq_items}>
                        {questions.map((item, index) => (
                            <div key={index} className={styles.faq_item}>
                                <button
                                    className={styles.faq_question}
                                    onClick={() => toggleAnswer(index)}
                                >
                                    {item.question}
                                </button>
                                <div
                                    className={`${styles.faq_answer} ${
                                        activeIndex === index ? styles.open : ''
                                    }`}
                                >
                                    <span>
                                        {item.answer.map((text) => (
                                            <p>{text}</p>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LandingMain = ({ activeCity, setActiveCity }) => {
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

    const { posts, postStatus } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const uniqueAddresses = [...new Set(posts.map((obj) => obj.address.split(', ')[0]))];

    // const [activeCity, setActiveCity] = useState(actCity)

    const postsLoading = postStatus === 'loading';

    React.useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return (
        <>
            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                spaceBetween={30}
                slidesPerView={1}
                speed={1000}
                autoplay={{ delay: 10000 }}
            >
                <SwiperSlide>
                    <div className={styles.intro}>
                        <a href="">
                            <div className={styles.desc}>
                                <h2>Рассрочка до 7 лет</h2>
                                <p>С первым взносом от 30%</p>
                            </div>
                            <img src={arrow_right_up} alt="" />
                        </a>
                        <img src={intro1} alt="" />
                        <a href="">
                            <div className={styles.desc}>
                                <h2>Альтернатива ипотеке</h2>
                                <p>Возможны условия по канонам Шариата</p>
                                <img src={arrow_right_up} alt="" />
                            </div>
                        </a>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.intro}>
                        <a href="">
                            <div className={styles.desc}>
                                <h2>Программа trade-in</h2>
                                <p>Обменяй свою квартиру на новую</p>
                            </div>
                            <img src={arrow_right_up} alt="" />
                        </a>
                        <img src={intro2} alt="" />
                        <a href="">
                            <div className={styles.desc}>
                                <h2>За 3 месяца</h2>
                                <p>Удобно, выгодно, безопасно</p>
                            </div>
                            <img src={arrow_right_up} alt="" />
                        </a>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className={styles.complexes}>
                <div className="container">
                    <div className="container_1200">
                        <div className={styles.list_complexes}>
                            {posts.map((obj, index) =>
                                activeCity === obj.address.split(', ')[0] ? (
                                    <Post key={index} {...obj} isLoading={postsLoading} setActiveCity={setActiveCity} />
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
                                                <Post {...obj} isLoading={postsLoading} setActiveCity={setActiveCity}/>
                                            ))}
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.block_img_btn_desc}>
                <div className="container">
                    <div className={styles.desc_btn}>
                        <div className={styles.desc}>
                            <h2>БРАЙТ-ПАРК - НОВЫЙ СТИЛЬ ЗАГОРОДНОЙ ЖИЗНИ</h2>
                            <p>
                                Комьюнити частных домов
                                <br />в экологичном районе Казани
                            </p>
                        </div>
                        <button>
                            <p>Выбрать дом</p>
                            <p>→</p>
                        </button>
                    </div>
                </div>
                <img src={bg1} alt="" />
            </div>

            <div className={styles.order_consultation}>
                <div className="container">
                    <div className="container_1200">
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
                                        <a href="">согласие на обработку персональных данных</a>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.unistroim_goroda}>
                <div className="container container_1200">
                    <h2>Унистроим города</h2>
                    <p>Качественное жилье для любимых клиентов</p>
                    <section>
                        <div className={styles.column}>
                            <div className={styles.img_desc}>
                                <img src={uni1} alt="" width={'100%'} />
                                <div className={styles.desc}>
                                    <h4>ФУНКЦИОНАЛЬНЫЕ КВАРТИРЫ</h4>
                                    <p>
                                        Различные форматы квартир: от студий до сити-хаусов и
                                        квартир с террасами, теплыми лоджиями, варианты с черновой
                                        отделкой и готовым ремонтом.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.img_desc}>
                                <img src={uni2} alt="" width={'90%'} />
                                <div className={styles.desc}>
                                    <h4>Город в городе</h4>
                                    <p>
                                        Каждый жилой комплекс оснащен развитой социальной и
                                        коммерческой инфраструктурой: детскими садами, школой,
                                        парковыми и прогулочными зонами, сетью ритейлов и
                                        медицинских учреждений, детских развивающих центров.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.img_desc}>
                                <div className={styles.desc}>
                                    <h4>СТИЛЬНЫЕ ПОДЪЕЗДЫ</h4>
                                    <p>
                                        «Лобби» квартиры, красивое и технологичное пространство,
                                        адаптированное под разные нужды и оснащенное безбарьерным
                                        входом, колясочной комнатой, удобной навигацией и
                                        тактильными табличками.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.img_desc}>
                                <img src={uni3} alt="" width={'60%'} />
                                <div className={styles.desc}>
                                    <h4>КАЧЕСТВЕННЫЕ ДОМА</h4>
                                    <p>
                                        Каждый дом – уникальный архитектурный проект с современным
                                        фасадом и удобными нишами для кондиционеров.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.img_desc}>
                                <div className={styles.desc}>
                                    <h4>БЕЗОПАСНЫЕ ДВОРЫ</h4>
                                    <p>
                                        Пространство, свободное от машин, оборудованное
                                        видеонаблюдением, включающее в себя: детские и спортивные
                                        площадки, зоны отдыха.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className={styles.block_img_btn_desc}>
                <div className="container">
                    <div className={styles.desc_btn}>
                        <div className={styles.desc}>
                            <h2>
                                ВЫБРАТЬ
                                <br />
                                КВАРТИРУ МЕЧТЫ
                            </h2>
                        </div>
                        <button>
                            <p>Наши проекты</p>
                            <p>→</p>
                        </button>
                    </div>
                </div>
                <img src={bg2} alt="" />
            </div>

            <div className={styles.news}>
                <div className="container container_1200">
                    <section>
                        <h2>Новости</h2>
                        <span className="green_underline ">
                            <a href="">Все новости</a>
                        </span>
                    </section>
                </div>
            </div>

            <div className={styles.block_img_btn_desc}>
                <div className="container">
                    <div className={styles.desc_btn}>
                        <div className={styles.desc}>
                            <h2>
                                УНИСТРОЙ –<br />
                                ФЕДЕРАЛЬНЫЙ
                                <br />
                                ДЕВЕЛОПЕР
                            </h2>
                            <p>
                                26 лет мы создаем жилые комплексы, кварталы и микрорайоны, где
                                хорошо жить, развиваться и быть счастливым.
                            </p>
                        </div>
                        <button>
                            <p>О компании</p>
                            <p>→</p>
                        </button>
                    </div>
                </div>
                <img src={bg3} alt="" />
            </div>

            <div className={styles.about_company + ' container'}>
                <div className="container_1200">
                    <div className={styles.place_desc}>
                        <img src={place} alt="" />
                        <p>
                            в Республике Татарстан и в Приволжском федеральном округе. По итогам
                            2020 года, компания вошла в топ застройщиков по объему ввода жилья.
                        </p>
                    </div>

                    <div className={styles.team_prof}>
                        <div className={styles.desc}>
                            <h2>КОМАНДА ПРОФЕССИОНАЛОВ</h2>
                            <p>
                                в Республике Татарстан и в Приволжском федеральном округе. По итогам
                                2020 года, компания вошла в топ застройщиков по объему ввода жилья.
                            </p>
                            <span className="green_underline">
                                <a href="">Присоединиться</a>
                            </span>
                        </div>
                        <img src={team} alt="" />
                    </div>
                </div>
            </div>

            <div className={styles.order_excursion}>
                <div className="container">
                    <div className="container_1200">
                        <div className={styles.img_desc_form}>
                            <img src={excursionimg} alt="" />
                            <div className={styles.desc_form}>
                                <div className={styles.desc}>
                                    <h3>Запишитесь на экскурсию</h3>
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
                </div>
            </div>

            <FAQ />
        </>
    );
};
