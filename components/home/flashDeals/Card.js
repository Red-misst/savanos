import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import { useEffect, useState } from "react";

export default function FlashCard({ flashSale, setLoading }) {
  const [active, setActive] = useState(0);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={flashSale.link} target="_blank">
          <img src={flashSale.image} alt="flash_deal" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          {flashSale.discount ? <span>-{flashSale.discount}%</span> : ""}
        </div>
      </div>
      <div className={styles.card__name}>
        <span>
          {flashSale.name.length > 23
            ? `${flashSale.name.slice(0, 23) + "..."}`
            : flashSale.name}
        </span>
      </div>
      <div className={styles.card__price}>
        <span>{flashSale.price}</span>
      </div>
      {/* <div className={styles.card__bar}>
        <div
          className={styles.card__bar_inner}
          style={{
            width: "80%",
          }}
        ></div>
      </div> */}
      <div className={styles.card__percentage}>{flashSale.qty} items left</div>
    </div>
  );
}
