import styles from "./Footer.module.scss";

import googlePlay from "../../media/socials/google-play.svg";
import appleStore from "../../media/socials/apple-store.svg";
import tg from "../../media/socials/tg.png";
import youtube from "../../media/socials/youtube.png";
import vk from "../../media/socials/vk.png";

export const Footer = () => {
    return (
        <footer className="container">
            <div className={styles.columns}>
                <div className={styles.column}>
                    <section>
                        <h4>Приложение унистрой</h4>
                        <div className={styles.column_content}>
                            <a
                                href="http://qrcoder.ru"
                                target="_blank"
                                id={styles.qr_code}
                            >
                                <img
                                    src="http://qrcoder.ru/code/?https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ%3Fsi%3DJMQ7__BpQ3uI-6xV&4&0"
                                    width="110px"
                                />
                            </a>

                            <p className={styles.small_text}>
                                Наведите камеру на QR-код, чтобы скачать
                                приложение или перейдите по ссылке
                            </p>

                            <div className={styles.stores}>
                                <a href="">
                                    <img src={googlePlay} alt="" />
                                </a>
                                <a href="">
                                    <img src={appleStore} alt="" />
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
                <div className={styles.column}>
                    <section>
                        <h4>Поиск квартир</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Проекты</p>
                            </a>
                            <a href="">
                                <p>По параметрам</p>
                            </a>
                            <a href="">
                                <p>По преимуществам</p>
                            </a>
                            <p></p>
                            <a href="">
                                <p>Машиноместа</p>
                            </a>
                            <a href="">
                                <p>Кладовые</p>
                            </a>
                            <a href="">
                                <p>Частные дома</p>
                            </a>
                        </div>
                    </section>
                    <section>
                        <h4>Проекты</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Наши объекты</p>
                            </a>
                            <a href="">
                                <p>Коммерческая недвижимость</p>
                            </a>
                            <a href="">
                                <p>Вторичная недвижимость</p>
                            </a>
                            <a href="">
                                <p>Online-трансляции</p>
                            </a>
                        </div>
                    </section>
                </div>
                <div className={styles.column}>
                    <section>
                        <h4>Способы покупки</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Ипотека</p>
                            </a>
                            <a href="">
                                <p>Trade-in</p>
                            </a>
                            <a href="">
                                <p>Рассрочка</p>
                                <p></p>
                            </a>
                            <a href="">
                                <p>Лизинг</p>
                            </a>
                            <a href="">
                                <p>Военная ипотека</p>
                            </a>
                            <a href="">
                                <p>Материнский капитал</p>
                            </a>
                            <a href="">
                                <p>Online - сервисы</p>
                            </a>
                        </div>
                    </section>
                    <section>
                        <h4>ONLINE - СЕРВИСЫ</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Мобильное приложение</p>
                            </a>
                            <a href="">
                                <p>Online-консультации</p>
                            </a>
                            <a href="">
                                <p>Online-экскурсии</p>
                            </a>
                            <a href="">
                                <p>Online-сделка</p>
                            </a>
                        </div>
                    </section>
                </div>
                <div className={styles.column}>
                    <section>
                        <h4>О КОМПАНИИ</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Новости</p>
                            </a>
                            <a href="">
                                <p>СМИ о нас</p>
                            </a>
                            <a href="">
                                <p>Для прессы</p>
                            </a>
                            <a href="">
                                <p>Карьера</p>
                            </a>
                            <a href="">
                                <p>Сервисная компания</p>
                            </a>
                        </div>
                    </section>
                    <section>
                        <h4>СОТРУДНИЧЕСТВО</h4>
                        <div className={styles.column_content}>
                            <a href="">
                                <p>Агентствам</p>
                            </a>
                            <a href="">
                                <p>Партнерам</p>
                            </a>
                            <a href="">
                                <p>Заказчикам</p>
                            </a>
                            <a href="">
                                <p>Компаниям</p>
                            </a>
                            <a href="">
                                <p>Купим землю</p>
                            </a>
                            <a href="">
                                <p>Унимания</p>
                            </a>
                        </div>
                    </section>
                </div>
                <div className={styles.column}>
                    <section>
                        <h4>КОНТАКТЫ</h4>
                        <div className={styles.column_content}>
                            <div className={styles.tel_soc}>
                                <div className={styles.tel}>
                                    <a href="#">+7 843 207-19-80</a>
                                    <span className="green_underline"><a href="#">Заказать обратный звонок</a></span>
                                </div>
                                <div className={styles.socials}>
                                    <a href="">
                                        <img src={tg} alt="" />
                                    </a>
                                    <a href="">
                                        <img src={youtube} alt="" />
                                    </a>
                                    <a href="">
                                        <img src={vk} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <button>Напишите нам</button>
                    </section>
                </div>
            </div>
            <div className={styles.copyrights}>
                <p className={styles.small_text}>© 2024 Унистрой, г. Казань.</p>
                <p className={styles.small_text}>
                    Информация, размещенная на сайте, носит исключительно
                    рекламный характер и не является публичной офертой.
                    Приведённые фотографии, рендеры, генплан проекта, планировки
                    квартир не являются точными копиями проектной документации и
                    предложены с целью наглядного представления о характеристике
                    квартир и помещений.
                </p>
            </div>
        </footer>
    );
};
