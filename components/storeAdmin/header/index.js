import styles from "./styles.module.scss";
import { useState } from "react";
import Link from "next/link";
import UserMenu from "./userMenu";
import { RiAccountCircleLine, RiArrowDropDownFill } from "react-icons/ri";

import { useSession } from "next-auth/react";

export default function Header({ setLoading }) {
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
              <h2 className="fs-2">saVanos - dashboard</h2>
            </span>
          </div>
        </Link>

        <ul className={`d-flex gap-3 ${styles.top_list}`}>
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
    </div>
  );
}
