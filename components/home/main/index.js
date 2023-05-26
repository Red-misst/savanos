import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";
export default function Main({ loading, setLoading }) {
  return (
    <div className={`container-fluid ${styles.main}`}>
      <Header loading={loading} setLoading={setLoading} />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}
