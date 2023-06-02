import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";
export default function Main({ setLoading, swipers }) {
  return (
    <div className={`container-fluid ${styles.main}`}>
      <Header setLoading={setLoading} />
      <Menu setLoading={setLoading} />
      <MainSwiper setLoading={setLoading} swipers={swipers} />
      <Offers setLoading={setLoading} />
      <User setLoading={setLoading} />
    </div>
  );
}
