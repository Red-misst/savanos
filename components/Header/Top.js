import styles from "./styles.module.scss";
import { useState, setState } from "react";
import Link from "next/link";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import UserMenu from "./UserMenu";

export default function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.top_li}>
            <img
              src="https://icons.veryicon.com/png/Flag/Rounded%20World%20Flags/Kenya%20Flag.png"
              alt="kenyan_flag"
            />
            <span>Kenya / Ksh</span>
          </li>
          <li className={styles.top_li}>
            <MdSecurity />
            <span>Secure Shopping</span>
          </li>
          <li className={styles.top_li}>
            <span>Fast</span>
          </li>
          <li className={styles.top_li}>
            <span>Help</span>
          </li>
          <li className={styles.top_li}>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.top_li}
            onMouseOver={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            {loggedIn ? (
              <li className={styles.top_li}>
                <div className={styles.flex}>
                  <img
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt="Profile_pic"
                  />
                  <span>John</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.top_li}>
                <div className={styles.flex}>
                  <img
                    src="data:image/png;base64,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"
                    alt="profile_pic"
                  />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {showMenu && <UserMenu loggedIn={loggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
