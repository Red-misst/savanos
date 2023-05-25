import styles from "./styles.module.scss";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to saVana!</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            src={session.user.image}
            alt="Profile"
            className={styles.menu_img}
          />
          <div className={styles.col}>
            <span>Welcome back</span>
            <h3>{session.user.name}</h3>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          
            <button className={styles.btn_primary}>Sign Up</button>
            <button className={styles.btn_outlined} onClick={()=> signIn()}>Sign In</button>
          
        </div>
      )}
      {session && (
        <ul>
          <li>
            <Link className="text-decoration-none" href="/profile">Account</Link>
          </li>
          <li>
            <Link className="text-decoration-none" href="/cart">Cart</Link>
          </li>
          <li>
            <Link className="text-decoration-none" href="/profile/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link className="text-decoration-none" href="/profile/orders">My Orders</Link>
          </li>
          <li>
            <Link className="text-decoration-none" href="/profile/customer-care">Customer center</Link>
          </li>
          <li>
            <button className={styles.btn_primary} onClick={()=> signOut()}>Sign out</button>
          </li>
        </ul>
      )}
    </div>
  );
}
