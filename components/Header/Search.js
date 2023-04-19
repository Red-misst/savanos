import styles from "./styles.module.scss";
import { RiSearchLine } from "react-icons/ri";

export default function Search() {
    return (
        <div className={`w-100 d-flex align-items-center flex-1 ${styles.search}`}>
        <input className="w-100" type="text" placeholder="Search for products" />
        <div className={styles.search_icon}>
          <RiSearchLine />
        </div>
      </div>
    );
    }