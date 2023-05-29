import styles from "@/styles/Home.module.scss";
import FoodSwiper from "@/components/food/foodSwiper";
import Header from "@/components/Header";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import { useState } from "react";
export default function Food() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header setLoading={setLoading} />
      <div classname="contaner-fluid"></div>
    </>
  );
}
