import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
export default function FlashCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__name}>
        <span>
          {product.name.length > 23
            ? `${product.name.slice(0, 23) + "..."}`
            : product.name}
        </span>
      </div>
      <div className={styles.card__price}>
        <span>
          KSh {Math.round(product.price * ((100 - product.discount) / 100))}
        </span>
        <span>
          -KSh
          {Math.round(
            product.price - product.price * ((100 - product.discount) / 100)
          )}
        </span>
      </div>
      <div className={styles.card__bar}>
        <div
          className={styles.card__bar_inner}
          style={{
            width: `${
              ((product.inStock - product.sold) * 100) / product.inStock
            }%`,
          }}
        ></div>
      </div>
      <div className={styles.card__percentage}>
        {Math.round(((product.inStock - product.sold) * 100) / product.inStock)}
        % left
      </div>
    </div>
  );
}
