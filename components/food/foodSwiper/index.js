import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper";

export default function FoodSwipero({ setLoading }) {
  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="foodSwiper"
      >
        {[...Array(10).keys()].map((i) => (
          <SwiperSlide>
            <img src={`../../../images/swiper/${i + 1}.jpg`} alt="Swiper-img" />
            <Link href="" onClick={handleLinkClick}></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
