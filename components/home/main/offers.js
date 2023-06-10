import styles from "./styles.module.scss";
import { offersArray } from "@/data/home";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers({ setLoading }) {
  const handleLinkClick = () => {
    setLoading(true);
  };

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
        {offersArray.map((offer, i) => (
          <SwiperSlide key={i}>
            <Link href="" onClick={handleLinkClick}>
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
