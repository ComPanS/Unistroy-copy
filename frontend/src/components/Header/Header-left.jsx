import styles from "./Header.module.scss";

import tg from "../../media/socials/tg.png";
import youtube from "../../media/socials/youtube.png";
import vk from "../../media/socials/vk.png";


export const HeaderLeft = ({navRef}) => {
    return (
        <section className={styles.header_left} ref={navRef}>
                <nav>
                    <a href="#">Напишите нам</a>
                    <a href="#">Акции</a>
                    <a href="#" className={styles.live}>
                        <div className={styles.live_circle}></div>Live
                    </a>
                </nav>
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
            </section>
    )
}