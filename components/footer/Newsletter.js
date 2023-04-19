import styles from "./styles.module.scss";
import Links from "./Links";

export default function Newsletter() {
  return (

      <div className={`mt-3 ${styles.footer_newsletter}`}>
        <h3 className={styles.footer_h3}>Newsletter</h3>
        <p>Subscribe to our newsletter and get 10% off your first purchase</p>
        <div className={styles.flex}>
          <form>
            <input type="email" placeholder="Your email address" />
            <button className={styles.btn_primary} type="submit">
              Subscribe
            </button>
          </form>
        </div>
        <p>
          By subscribing you agree to our{" "}
          <a href="/">Privacy & Cookie Policy</a>{" "}
        </p>
      </div>

  );
}
