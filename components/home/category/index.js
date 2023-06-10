import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export default function Category({ header, products, background, setLoading }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <Link href="" onClick={handleLinkClick}>
          <BsArrowRightCircle />
        </Link>
      </div>
      <div className={styles.category__products}>
        {products
          .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .map((product, i) => (
            <div className={styles.product} key={i}>
              <Link href="" onClick={handleLinkClick}>
                <img src={product.image} alt="" />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
