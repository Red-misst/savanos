import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";

import { signIn } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "../../../data/home";

export default function User({ setLoading }) {
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setLoading(true);
  };

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <div className={styles.user}>
      <img
        src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685628783/userheader_gizaig.jpg"
        alt="header-img"
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="profile_img" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img
              src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685628495/992490_b0iqzq_pz5mzd.png"
              alt="profile_img"
            />
            <div className={styles.user__infos_btns}>
              <button
                className={styles.btn_primary}
                onClick={() => {
                  handleButtonClick();
                  signIn();
                }}
              >
                Sign Up/ Sign In
              </button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile" legacyBehavior>
              <a onClick={handleLinkClick}>
                <IoSettingsOutline />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a onClick={handleLinkClick}>
                <HiOutlineClipboardList />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a onClick={handleLinkClick}>
                <AiOutlineMessage />
              </a>
            </Link>
          </li>
          <li>
            <Link href="" legacyBehavior>
              <a onClick={handleLinkClick}>
                <BsHeart />
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685629144/5a5a6d2414d8c4188e0b088d_gmfahh.png"
            alt="new_badge"
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide>
                <Link href="" onClick={handleLinkClick}>
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/dcdivbkwd/image/upload/v1685628783/userheader_gizaig.jpg"
        alt="footer_img"
        className={styles.user__footer}
      />
    </div>
  );
}
