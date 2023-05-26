import styles from "./styles.module.scss";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function Cart({ loading, setLoading }) {
  const { cart } = useSelector((state) => ({ ...state }));

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <Link href="/cart" onClick={handleLinkClick}>
      <div className={styles.cart}>
        <TiShoppingCart className={styles.icon} />
        <span>{cart.cartItems.length}</span>
      </div>
    </Link>
  );
}
