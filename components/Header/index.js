import styles from "./styles.module.scss";
import Top from "./Top";


export default function Header() {
  return (
    <header className={`sticky-top container-fluid ${styles.header}`}>
  
      <Top />
    </header>
  );
}
