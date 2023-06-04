import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import Ad from "@/components/ad";
import Footer from "@/components/footer";
import Main from "@/components/home/main";

import ProductsSwiper from "@/components/productsSwiper";
import MainSwiper from "@/models/MainSwiper";
import FlashSale from "@/models/FlashSale";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import Category from "@/components/home/category";
import db from "@/utils/db";
import { useState } from "react";
import FlashDeals from "@/components/home/flashDeals";
import {
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";

import DotLoaderSpinner from "@/components/loaders/dotLoader";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  products,
  swipers,
  offers,
  flashSales,
  gaming,
}) {
  const [loading, setLoading] = useState(false);
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Ad />
      <Header setLoading={setLoading} />
      <div className={`container-fluid ${styles.home}`}>
        <Main setLoading={setLoading} swipers={swipers} offers={offers} />

        <FlashDeals setLoading={setLoading} flashSales={flashSales} />
        <div className={styles.home__category}>
          <Category
            header="Dresses"
            products={women_dresses}
            background="#5a31f4"
            setLoading={setLoading}
          />
          {!isMedium && (
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
              setLoading={setLoading}
            />
          )}
          {isMobile && (
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
              setLoading={setLoading}
            />
          )}
          <Category
            header="Accessories"
            products={women_accessories}
            background="#000"
            setLoading={setLoading}
          />
        </div>
        <ProductsSwiper
          products={women_swiper}
          header="Trending Fashion"
          bg="#2f82ff"
          setLoading={setLoading}
        />
        <ProductsSwiper
          products={gaming}
          header="For Gamers"
          bg="#2f82ff"
          setLoading={setLoading}
        />
        <ProductsSwiper
          products={homeImprovSwiper}
          header="House Improvements"
          bg="#5a31f4"
          setLoading={setLoading}
        />
        <div className={`row ${styles.products}`}>
          {products.map((product) => (
            <ProductCard
              className="col-sm-6 col-md-3 col-lg-3"
              product={product}
              key={product._id}
              setLoading={setLoading}
            />
          ))}
        </div>
      </div>
      <Footer setLoading={setLoading} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();

  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let swipers = await MainSwiper.find().lean();
  swipers = swipers.map((swiper) => {
    return {
      img: swiper.img,
      link: `/browse?category=${swiper.category}`,
    };
  });

  let gaming = await Product.find({ category: "62c2bdd58b564896ec16cc6b" })
    .sort({ createdAt: -1 })
    .lean();

  gaming = gaming.map((product) => {
    const active = Math.floor(Math.random() * product.subProducts.length);
    const subProduct = product.subProducts[active];
    const prices = subProduct.sizes.map((size) => size.price);
    const price =
      prices.length > 1
        ? `KSh ${Math.min(...prices)} - KSh ${Math.max(...prices)}`
        : prices[0];

    return {
      link: `/product/${product.slug}?style=${active}`,
      price,
      name: product.name,
      image: subProduct.images[0].url,
    };
  });

  let offers = await Product.find()
    .sort({ "subProducts.discount": -1, createdAt: -1 })
    .limit(15)
    .lean();

  let deals = await FlashSale.find().lean();
  let productIds = deals.map((deal) => deal.product);
  let flashSales = await Product.find({ _id: { $in: productIds } }).lean();

  flashSales = flashSales.map((product) => {
    const active = Math.floor(Math.random() * product.subProducts.length);
    const subProduct = product.subProducts[active];
    const prices = subProduct.sizes.map((size) => size.price);
    const price =
      prices.length > 1
        ? `KSh ${Math.min(...prices)} - KSh ${Math.max(...prices)}`
        : prices[0];

    const discount = subProduct.discount ? subProduct.discount : null;

    return {
      link: `/product/${product.slug}?style=${active}`,
      price,
      name: product.name,
      image: subProduct.images[0].url,
      discount,
    };
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      swipers: JSON.parse(JSON.stringify(swipers)),
      flashSales: JSON.parse(JSON.stringify(flashSales)),
      offers: JSON.parse(JSON.stringify(offers)),
      gaming: JSON.parse(JSON.stringify(gaming)),
    },
  };
}
