import styles from "./styles.module.scss";
import Link from "next/link";
export default function UserMenu({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to MyDuka!</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="Profile"
            className={styles.menu_img}
          />
          <div className={styles.col}>
            <span>Welcome back</span>
            <h3>John Kamau</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/cart">Account</Link>
        </li>
        <li>
          <Link href="/profile/cart">Cart</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/customer-care">Customer center</Link>
        </li>
      </ul>
    </div>
  );
}
