import styles from "./styles.module.scss";
import Links from "./Links";
import Socials from "./Socials";
import Newsletter from "./Newsletter";
import Payment from "./Payment";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className={`container-fluid py-4 ${styles.footer}`}>
      <div className="row">
        <div className="col-md-6">
          <Links />
        </div>
        <div className="col-md-6">
          <Payment />
        </div>
        <div className="col-md-6">
          <Socials />
        </div>
        <div className="col-md-6">
          <Newsletter />
        </div>
        
        <div className="col-12 my-auto">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
