import styles from "./styles.module.scss";
import Top from "./Top";

export default function Header({ loading, setLoading }) {
  return (
    <header className={`sticky-top container-fluid ${styles.header}`}>
      <Top loading={loading} setLoading={setLoading} />
    </header>
  );
}
