import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Main from "@/components/home/main";
import axios from "axios";
import ProductsSwiper from "@/components/productsSwiper";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import Category from "@/components/home/category";
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

export default function Home({ products }) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
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
        <ProductsSwiper products={women_swiper} />
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
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
