import Layout from "@/components/storeAdmin/layout";
import styles from "@/styles/storeDashboard.module.scss";
import User from "@/models/User";
import db from "@/utils/db";
import Order from "@/models/Order";
import Store from "@/models/Store";
import Product from "@/models/Product";
import Head from "next/head";
import { useEffect, useState } from "react";
import Dropdown from "@/components/storeAdmin/dashboard/dropdown";
import Notifications from "@/components/storeAdmin/dashboard/notifications";

import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";

export default function dashboard({ user, store, orders, products }) {
  const [storeProductsTotal, setStoreProductsTotal] = useState(0);
  const [unpaidStoreProductsTotal, setUnpaidStoreProductsTotal] = useState(0);

  useEffect(() => {
    // Calculate the total of products from the specific store
    const calculateStoreProductsTotal = () => {
      const total = orders.reduce((total, order) => {
        const storeOrderProducts = order.products.filter(
          (product) => product.store === store._id
        );
        const orderProductsTotal = storeOrderProducts.reduce(
          (subtotal, product) => subtotal + product.price * product.qty,
          0
        );
        return total + orderProductsTotal;
      }, 0);
      setStoreProductsTotal(total);
    };

    // Calculate the unpaid total of products from the specific store
    const calculateUnpaidStoreProductsTotal = () => {
      const total = orders.reduce((total, order) => {
        if (!order.isPaid) {
          const storeOrderProducts = order.products.filter(
            (product) => product.store === store._id
          );
          const orderProductsTotal = storeOrderProducts.reduce(
            (subtotal, product) => subtotal + product.price * product.qty,
            0
          );
          return total + orderProductsTotal;
        }
        return total;
      }, 0);
      setUnpaidStoreProductsTotal(total);
    };

    calculateStoreProductsTotal();
    calculateUnpaidStoreProductsTotal();
  }, [orders, store._id]);

  return (
    <div>
      <Head>
        <title>{store.name} - Seller Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={user?.image} />
            <Notifications classname="fs-2" />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>+ KSh{storeProductsTotal.toFixed(2)}</h4>
              <h5>KSh {unpaidStoreProductsTotal.toFixed(2)} Unpaid.</h5>
              <span>Total Earnings</span>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/storeAdmin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id.substring(0, 4)}</td>
                    <td>KSh {order.total} </td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status == "Not Processed"
                            ? styles.not_processed
                            : order.status == "Processing"
                            ? styles.processing
                            : order.status == "Dispatched"
                            ? styles.dispatched
                            : order.status == "Cancelled"
                            ? styles.cancelled
                            : order.status == "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  db.connectDb();
  const user = await User.findById(query.id).lean();
  const store = await Store.findOne({ seller: query.id }).lean();

  const orders = await Order.find({ "products.store": store._id }).lean();

  const products = await Product.find({ store: store._id }).lean();

  db.disconnectDb();
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      store: JSON.parse(JSON.stringify(store)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  }; 
}
