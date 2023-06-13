import styles from "@/styles/products.module.scss";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import { useState } from "react";

import ProductCard from "@/components/storeAdmin/products/productCard";
import Header from "@/components/storeAdmin/header";
export default function all({ products }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header setLoading={setLoading} />
      <div className="container-md">
      <div className={styles.header}>All Products</div>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
