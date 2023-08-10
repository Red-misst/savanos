import styles from "@/styles/product.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import Store from "@/models/Store";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/footer";
// import { produceWithPatches } from "immer";

import MainSwiper from "@/components/productPage/mainSwiper";
import { useState } from "react";
import Infos from "@/components/productPage/infos";
import Reviews from "@/components/productPage/reviews";
import ProductsSwiper from "@/components/productsSwiper";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
export default function product({ product, related, simProducts, store }) {
  const [loading, setLoading] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  console.log(product);

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header setLoading={setLoading} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub) => (
              <span>/{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos
              product={product}
              setActiveImg={setActiveImg}
              store={store}
            />
          </div>
          <Reviews product={product} />

          <ProductsSwiper
            products={simProducts}
            header="You might also be interested in..."
            setLoading={setLoading}
            bg="#2f82ff"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const slug = query.slug;
  const style = query.style || 0;
  const size = query.size || 0;
  db.connectDb();
  //------------

  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();

  let store = await Store.findById(product.store).lean();

  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });
  let newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange: subProduct.discount
      ? `KSh ${(prices[0] - prices[0] / subProduct.discount).toFixed(
          2
        )} - KSh ${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)}`
      : `KSh ${prices[0]} - KSh ${prices[prices.length - 1]}`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };
  const related = await Product.find({ category: product.category._id }).lean();
  //------------
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }
  //similar products swiper
  let simProducts = await Product.find({ category: "62c2bdd58b564896ec16cc6b" })
    .sort({ createdAt: -1 })
    .lean();

  simProducts = simProducts.map((product) => {
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
  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      related: JSON.parse(JSON.stringify(related)),
      store: JSON.parse(JSON.stringify(store)),
      simProducts: JSON.parse(JSON.stringify(simProducts)),
    },
  };
}
