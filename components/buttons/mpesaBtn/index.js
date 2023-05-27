import { MdShoppingCartCheckout } from "react-icons/md";

import styles from "./styles.module.scss";
export default function MpesaBtn({ type, text, icon }) {
  return (
    <button className={styles.button} type={type}>
      {text}
      <div className={styles.svg__wrap}>
        <MdShoppingCartCheckout />
      </div>
    </button>
  );
}
