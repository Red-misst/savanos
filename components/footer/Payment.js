import styles from "./styles.module.scss";

export default function Payment() {
  return (
    
      <div>
        <h3 className={styles.footer_h3}>Accepted Payment Methods</h3>
        <div className={`d-flex justify-content-between mt-4 ${styles.footer_flexwrap}`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
            alt="Mpesa"
          />
          <img src="../../../images/payment/visa.webp" alt="Visa" />
            <img src="../../../images/payment/mastercard.webp" alt="Mastercard" />
            <img src="../../../images/payment/paypal.webp" alt="Paypal" />
        </div>
      </div>
   
  );
}
