import styles from "./styles.module.scss";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function Main() {

    const {cart} = useSelector((state) => ({...state}));
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="../../../logo.png" alt="logo" />
          </div>
        </Link>
        <div className={styles.search}>
            <input type="text" placeholder="Search for products" />
            <div className={styles.search_icon}>
                <RiSearchLine />
            </div>
        </div>
        <Link href="/cart">
            <div className={styles.cart}>
                <TiShoppingCart/>
                <span></span>
            </div>
        </Link>
      </div>
    </div>
  );
}
