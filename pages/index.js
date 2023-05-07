import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import Ad from "@/components/ad";
import Footer from "@/components/footer";
import Main from "@/components/home/main";
import axios from "axios";
import ProductsSwiper from "@/components/productsSwiper";
 import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import Category from "@/components/home/category";
import db from "@/utils/db";
import FlashDeals from "@/components/home/flashDeals";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({products}) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <Ad />
      <Header />
      <div className={`container-fluid ${styles.home}`}>
        <Main />
        <FlashDeals />
        <div className={styles.home__category}>
          <Category
            header="Dresses"
            products={women_dresses}
            background="#5a31f4"
          />
          {!isMedium && (
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
            />
          )}
          {isMobile && (
            <Category
              header="Shoes"
              products={women_shoes}
              background="#3c811f"
            />
          )}
          <Category
            header="Accessories"
            products={women_accessories}
            background="#000"
          />
        </div>
        <ProductsSwiper
          products={women_swiper}
          header="Trending Fashion"
          bg="#2f82ff"
        />
        <ProductsSwiper
          products={gamingSwiper}
          header="For Gamers"
          bg="#2f82ff"
        />
        <ProductsSwiper
          products={homeImprovSwiper}
          header="House Improvements"
          bg="#5a31f4"
        />
         <div className={`row ${styles.products}`}>
          {products.map((product) => (
            <ProductCard className="col-sm-6 col-md-4 col-lg-3" product={product} key={product._id} />
          ))}
        </div> 
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
