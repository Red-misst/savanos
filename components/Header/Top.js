import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import {
  RiAccountCircleLine,
  RiArrowDropDownFill,
  RiCustomerService2Fill,
} from "react-icons/ri";
import Cart from "./Cart";
import { useSession } from "next-auth/react";

export default function Top({ setLoading }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={`row ${styles.top}`}>
      <div className="col-12 d-flex justify-content-space-btn gap-5">
        <Link href="/" className="text-decoration-none text-dark" passHref>
          <div className=" my-auto" onClick={handleLinkClick}>
            <span>
              <h2 className="fs-2">saVanos</h2>
            </span>
          </div>
        </Link>

        <div className={`d-flex w-50 my-auto ${styles.search_1}`}>
          <Search  setLoading={setLoading}/>
        </div>
        <ul className={`d-flex gap-3 ${styles.top_list}`}>
          <li className={styles.top_li}>
            <div className={styles.cart_1}>
              <Cart setLoading={setLoading} />
            </div>
          </li>
          <li className={styles.top_li}>
            <AiOutlineHeart className="fs-2" />
            <Link
              href="/profile/wishlist"
              className="text-decoration-none text-dark"
              onClick={handleLinkClick}
            >
              <span>Wishlist</span>
            </Link>
          </li>
          <li className={styles.top_li}>
            <RiCustomerService2Fill className="fs-2" />
            <Link
              href="/profile/wishlist"
              className="text-decoration-none text-dark"
              onClick={handleLinkClick}
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
              <ul>
                <li className={styles.top_li}>
                  <div
                    className={`d-flex justify-content-between ${styles.flex}`}
                  >
                    <img
                      className="my-auto"
                      src={session.user.image}
                      alt="Profile_pic"
                    />
                    <span>
                      {session.user.name.length > 5
                        ? `${session.user.name.substring(0, 5)}..`
                        : session.user.name}
                    </span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              </ul>
            ) : (
              <ul>
                <li className={styles.top_li}>
                  <div className={styles.flex}>
                    <RiAccountCircleLine />
                    <span></span>
                    <RiArrowDropDownFill />
                  </div>
                </li>
              </ul>
            )}
            {showMenu && <UserMenu session={session} setLoading={setLoading} />}
          </li>
        </ul>
      </div>
      <div
        className={`col-12 d-flex justify-content-space-btn align-items-center  ${styles.search_2}`}
      >
        <BiCategoryAlt className={styles.categories} />
        <Search  setLoading={setLoading}/>
      </div>
    </div>
  );
}
