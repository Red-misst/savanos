import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";
export default function Main() {

  return (
    <div className={`container-fluid ${styles.main}`}>
      
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />

    </div>
  );
}

