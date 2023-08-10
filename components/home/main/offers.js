import styles from "./styles.module.scss";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers({ setLoading, offers }) {
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
        {offers.map((offer, i) => (
          <SwiperSlide key={i}>
            <Link href={offer.link} onClick={handleLinkClick}>
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
