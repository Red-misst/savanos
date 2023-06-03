import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowRightCircle } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";

export default function ProductsSwiper({ header, products, bg }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{ background: `${bg ? bg : ""}` }}
        >
          {header}
          <span>
            <Link href="" className="text-decoration-none">
              <BsArrowRightCircle className="fs-2" />
            </Link>
          </span>
        </div>
      )}
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide>
            <div className={styles.product}>
              <div className={styles.product__img}>
                <Link
                  href={`${product.link}`}
                  className="text-decoration-none"
                  target="_blank"
                >
                  <img src={product.image} alt="product_img" />
                </Link>
              </div>
              <div className={styles.product__infos}>
                <h1>
                  {product.name.length > 23
                    ? `${product.name.slice(0, 23)}...`
                    : product.name}
                </h1>
                {product.price && <span> KSh {product.price}</span>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
