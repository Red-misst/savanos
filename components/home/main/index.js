import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
// import { useSession } from "next-auth/react";
import Menu from "./Menu";
// import Link from "next/link";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineClipboardList } from "react-icons/hi";
// import { AiOutlineMessage } from "react-icons/ai";
// import { BsHeart } from "react-icons/bs";
// //-----------------------------
// import { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-cards";

// // import required modules
// import { EffectCards, Navigation } from "swiper";
 import User from "./User";
// import Header from "./Header";
export default function Main() {
  // const { data: session } = useSession();
  return (
    <div className={`container-fluid ${styles.main}`}>
      <div className={styles.header}>header</div>
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
      {/* <Header /> */}
    </div>
  );
}

// <div className="row d-flex gap-3">
// <div className="col-2 h-100vh">menu</div>
// <div className="col">
//   <div className="row ">
//     <div className="col-12 gap-3">header</div>

//     <div className="col-md-7">
//       <div className="row gap-3 ">
//         <div className="col-12">swiper</div>
//         <div className="col-12">offers</div>
//       </div>
//     </div>

//     <div className="col-md-5">User</div>
//   </div>
// </div>
// </div>
