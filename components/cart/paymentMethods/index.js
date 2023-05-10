import styles from "./styles.module.scss";
import { FaShippingFast } from "react-icons/fa";

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment Methods</h2>
      <div className={styles.images}>
      <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
            alt="Mpesa"
          />
        <img src="../../../images/payment/visa.webp" alt="visa" />
        <img src="../../../images/payment/mastercard.webp" alt="mastercard" />
        <img src="../../../images/payment/paypal.webp" alt="paypal" />
      </div>
      <h2 className={styles.header}>Buyer Protection</h2>
      <div className={styles.protection}>
        <FaShippingFast className="fs-4"/>
      Free shipping for prime members
      </div>
      <div className={styles.protection}>
        <img src="../../../images/protection.png" alt="" />
        Get full refund if the item is not as described or if it's not
        delivered.
      </div>
      
    </div>
  );
}
