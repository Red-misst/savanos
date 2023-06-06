import { useState } from "react";
import styles from "./styles.module.scss";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import slugify from "slugify";
import { useRouter } from "next/router";
export default function Sidebar({ item, visible, index, session }) {
  const [show, setShow] = useState(visible);
  const router = useRouter();
  return (
    <li>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}__${link.filter}`}
                    className="text-decoration-none text-secondary"
                    legacyBehavior
                  >
                    {link.name}
                  </Link>
                </li>
              ) : link.link.startsWith("/storeAdmin") ? (
                <li
                  className={
                    (router.query.q || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={link.link}
                    className="text-decoration-none text-secondary"
                    legacyBehavior
                  >
                    {link.name}
                  </Link>
                </li>
              ) : link.link.startsWith("/storeAdmin/create") ? (
                <li
                  className={
                    (router.query.q || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}/${session.user?.id}`}
                    className="text-decoration-none text-secondary"
                    legacyBehavior
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li
                  className={
                    (router.query.q || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                    className="text-decoration-none text-secondary"
                    legacyBehavior
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  );
}
