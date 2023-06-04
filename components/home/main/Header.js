import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
export default function Header({ setLoading }) {
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.header}>
      <ul>
        {session?.user?.role === "seller" ? (
          <li>
            <Link
              className="text-decoration-none"
              href={`/storeAdmin/dashboard/${session.user.id}`}
              onClick={handleLinkClick}
            >
              <div className={styles.cont}>
                <img
                  src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685630125/bar-chart-icon-analytics-symbol_53876-116178.jpg_gwwqfo.jpg"
                  alt="seller_profile_img"
                />
                <span>Store</span>
              </div>
            </Link>
          </li>
        ) : (
          <li>
            <Link className="text-decoration-none" href="/">
              <div className={styles.cont}>
                <img
                  src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012834/cld-sample-3.jpg"
                  alt="seller_profile_img"
                />
                <span>Home</span>
              </div>
            </Link>
          </li>
        )}

        <li>
          <Link className="text-decoration-none" href="/food">
            <div className={styles.cont}>
              <img
                src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1676012814/samples/food/fish-vegetables.jpg"
                alt="food_img"
              />
              <span>Food</span>
            </div>
          </Link>
        </li>
        <li>
          <Link className="text-decoration-none" href="/">
            <div className={styles.cont}>
              <img
                src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685637435/photo-1542838132-92c53300491e_ewxnln.jpg"
                alt="food_img"
              />
              <span>Groceries</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
