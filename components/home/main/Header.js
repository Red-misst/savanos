import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";

export default function Header() {
  const { data: session } = useSession();
 
  console.log(session);

  return (
    <div className={styles.header}>
      <ul>
        {session ? (
          <li>
            <Link
              className="text-decoration-none"
              href={`/storeAdmin/dashboard/${session.user.id}`}
            >
              Store
            </Link>
          </li>
        ) : (
          <li>
            <Link className="text-decoration-none" href="">
              Store
            </Link>
          </li>
        )}

        <li>
          <Link className="text-decoration-none" href="">
            Electronics
          </Link>
        </li>
        <li>
          <Link className="text-decoration-none" href="">
            Watches
          </Link>
        </li>
      </ul>
    </div>
  );
}
