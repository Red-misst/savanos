import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";
import { useState, setState } from "react";
import Link from "next/link";
import Search from "./Search";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import {
  RiAccountCircleLine,
  RiArrowDropDownFill,
  RiCustomerService2Fill,
} from "react-icons/ri";
import Cart from "./Cart";
import { useSession } from "next-auth/react";

export default function Top() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={` row ${styles.top}`}>
      <div className="col-12 d-flex justify-content-space-btn gap-5">
        <Link className="text-decoration-none my-auto" href="/">
          <div>
            <span>
              <h2 className="fs-2 text-dark">saVanna</h2>
            </span>
          </div>
        </Link>

        <div className={`d-flex w-50 my-auto ${styles.search_1}`}>
          <Search />
        </div>
        <ul className={`d-flex gap-3 ${styles.top_list}`}>
          <li className={styles.top_li}>
            <div className={styles.cart_1}>
              <Cart />
            </div>
          </li>
          <li className={styles.top_li}>
            <AiOutlineHeart className="fs-2" />
            <Link
              className="text-decoration-none text-secondary"
              href="/profile/wishlist"
            >
              <span>Wishlist</span>
            </Link>
          </li>
          <li className={styles.top_li}>
            <RiCustomerService2Fill className="fs-2" />
            <Link
              className="text-decoration-none text-secondary"
              href="/profile/wishlist"
            >
              <span>
                Customer
                <br />
                Support
              </span>
            </Link>
          </li>
          <li
            className={styles.top_li}
            onMouseOver={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            {session ? (
              <li className={styles.top_li}>
                <div className={`d-flex justify-content-between ${styles.flex}`}> 
                  <img
                  className="my-auto"
                    src={session.user.image}
                    alt="Profile_pic"
                  />
                  <span className="my-auto ">{session.user.name} </span>
                  <RiArrowDropDownFill/>
                </div>
              </li>
            ) : (
              <li className={styles.top_li}>
                <div className={styles.flex}>
                  <RiAccountCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill/>
                </div>
              </li>
            )}
            {showMenu && <UserMenu session ={session} />}
          </li>
        </ul>
      </div>
      <div
        className={`col-12 d-flex justify-content-space-btn align-items-center  ${styles.search_2}`}
      >
        <Search />
      </div>
    </div>
  );
}
