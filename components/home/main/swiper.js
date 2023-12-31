import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwiper({ setLoading, swipers }) {
  const handleLinkClick = () => {
    setLoading(true);
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {swipers.map((swiper, i) => (
          <SwiperSlide key={i}>
            <Link href={swiper.link} onClick={handleLinkClick}>
              <img src={swiper.img} alt="Swiper-img" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
