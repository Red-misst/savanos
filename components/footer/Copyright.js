import styles from "./styles.module.scss";

export default function Copyright() {
  return (
  
      <div className={` ${styles.footer_copyright}`}>
        <p className={styles.footer_p}>
          <span className={styles.footer_span}>
            &copy; 2023 MyDuka. All Rights Reserved.
          </span>
        </p>
      </div>
  );
}
