import styles from "./styles.module.scss";
import {AiOutlineShop} from "react-icons/ai";

export default function StoreDetails({store}){
    return(
        <div className={styles.store}>
        <div className={styles.store__container}>
            <div className={styles.store__header}>
            <div className={styles.store__header_img}>
                <AiOutlineShop className="fs-2" />
            </div>
            <div className={styles.store__header_info}>
                <h3>{store.name}</h3>
            </div>
            </div>
        </div>
        </div>
    )

}