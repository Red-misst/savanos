import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import { useEffect, useState } from "react";
export default function FlashCard({ product, setLoading }) {
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active, product]);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={`/product/${product.slug}?style=${active}`} target="_blank">
          <img src={product.subProducts[i].images[0]} alt="flash_deal" />
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
