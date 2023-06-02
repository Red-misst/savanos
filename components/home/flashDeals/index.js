import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import Countdown from "@/components/countdown";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";

import FlashCard from "./Card";
export default function FlashDeals({ setLoading, flashSales }) {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 5, 5)} />
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
      >
        <div className={styles.flashDeals__list}>
          {flashSales.map((flashSale, i) => (
            <SwiperSlide>
              <FlashCard
                flashSale={flashSale}
                key={i}
                setLoading={setLoading}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
