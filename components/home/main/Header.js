import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
export default function Header({ setLoading }) {
  const { data: session } = useSession();

  console.log(session);

  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.header}>
      <ul>
        {session ? (
          <li>
            <Link
              className="text-decoration-none"
              href={`/storeAdmin/dashboard/${session.user.id}`}
              onClick={handleLinkClick}
            >
              Store
            </Link>
          </li>
        ) : (
          <li>
            <Link
              className="text-decoration-none"
              href=""
              onClick={handleLinkClick}
            >
              Store
            </Link>
          </li>
        )}

        <li>
          <Link
            className="text-decoration-none"
            href=""
            onClick={handleLinkClick}
          >
            Electronics
          </Link>
        </li>
        <li>
          <Link
            className="text-decoration-none"
            href=""
            onClick={handleLinkClick}
          >
            Watches
          </Link>
        </li>
      </ul>
    </div>
  );
}
