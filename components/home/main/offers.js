import styles from "./styles.module.scss";
import { offersArray } from "@/data/home";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers() {
  return (
    <div className={styles.offers}>
     
     
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersArray.map((offer) => (
          <SwiperSlide>
            <Link href="">
              <img src={offer.image} alt="offers" />
            </Link>
            <span>{offer.price}Ksh</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
