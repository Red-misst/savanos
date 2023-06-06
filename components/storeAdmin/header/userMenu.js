import styles from "./styles.module.scss";
import Sidebar from "@/components/profile/sidebar";
import { storeData } from "@/data/profile";
import { signIn } from "next-auth/react";

export default function UserMenu({ session, setLoading }) {
  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <>
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
            <button
              className={styles.btn_primary}
              onClick={() => {
                signIn();
                handleLinkClick();
              }}
            >
              Sign Up/ Sign In
            </button>
          </div>
        )}
        {session && (
          <ul>
            {storeData.map((item, i) => (
              <Sidebar
                key={i}
                item={item}
                session={session}
                visible={"" == i.toString()}
                index={i.toString()}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
