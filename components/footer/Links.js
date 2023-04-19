import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links() {
  return (
 
     
          <div className={styles.footer_links}>
            {links.map((link, i) => {
              return (
                <ul>
                  {i === 0 ? (
                    <img src="../../../logo.png" alt="logo" />
                  ) : (
                    <h3 className={styles.footer_h3}>{link.heading}</h3>
                  )}
                  {link.links.map((link) => {
                    return (
                      <li>
                        <Link href={link.link}>{link.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
       

  );
}
const links = [
  {
    heading: "MyDuka",
    links: [
      {
        name: "About us",
        link: "",
      },
      {
        name: "Contact us",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer center",
        link: "",
      },
      {
        name: "Terms & Conditions",
        link: "",
      },
      {
        name: "Feedback survey",
        link: "",
      },
    ],
  },
  {
    heading: "Help & Support",
    links: [
      {
        name: "Fashion size Guide",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Track Order",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
    ],
  },
];
