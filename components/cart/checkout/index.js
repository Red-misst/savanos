import { Link } from "@material-ui/core";
import styles from "./styles.module.scss";

export default function Checkout({
  subtotal,
  setLoading,
  total,
  selected,
  saveCartToDbHandler,
}) {
  const handleLinkClick = () => {
    setLoading(true);
  };
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>KSh{subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping fee(if any) will be applied in the next page</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>KSh {total}</span>
      </div>
      <div className={styles.submit}>
      <Link className="text-decoration-none">
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? "#eee" : ""}`,
            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
          }}
          onClick={() => {
            saveCartToDbHandler();
            handleLinkClick();
          }}
        >
          Continue
        </button>
        </Link>
      </div>
    </div>
  );
}
