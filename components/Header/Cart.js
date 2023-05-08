import styles from "./styles.module.scss";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";


export default function Cart() {
    const { cart } = useSelector((state) => ({ ...state }));
  return (
    <Link href="/cart">
      <div className={styles.cart}>
        <TiShoppingCart className={styles.icon} />
        <span>{cart.cartItems.length}</span>
      </div>
    </Link>
  );
}
