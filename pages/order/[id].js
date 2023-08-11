import styles from "@/styles/order.module.scss";
import Header from "@/components/cart/header";
import Order from "@/models/Order";
import User from "@/models/User";
import { IoIosArrowForward } from "react-icons/io";
import db from "@/utils/db";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Mpesa from "@/components/mpesa";
import DotLoaderSpinner from "@/components/loaders/dotLoader";

function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}

export default function order({ orderData }) {
  const [loading, setLoading] = useState(false);
  const [dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    success: "",
  });

  function createOrderHanlder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData.total,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }
  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${orderData._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "PAY_ERROR", payload: error });
      }
    });
  }
  function onErroHandler(error) {
    (error);
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header setLoading={setLoading} />

      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                {orderData._id}
              </div>
         
              <div className={styles.order__header_status}>
                Order Status :
                <span
                  className={
                    orderData.status == "Not Processed"
                      ? styles.not_processed
                      : orderData.status == "Processing"
                      ? styles.processing
                      : orderData.status == "Dispatched"
                      ? styles.dispatched
                      : orderData.status == "Cancelled"
                      ? styles.cancelled
                      : orderData.status == "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {orderData.status}
                </span>
              </div>
            </div>
            <div className={styles.order__products}>
              {orderData.products.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      KSh {product.price} x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>
                      KSh {product.price * product.qty}
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                {orderData.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal</span>
                      <span>KSh {orderData.totalBeforeDiscount}</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied <em>({orderData.couponApplied})</em>{" "}
                      </span>
                      <span>
                        - KSh{" "}
                        {(
                          orderData.totalBeforeDiscount - orderData.total
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Shipping Fee</span>
                      <span>+ KSh {orderData.shippingPrice}</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL TO PAY</span>
                      <b>KSh {orderData.total}</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Shipping Fee</span>
                      <span>+ KSh {orderData.shippingPrice}</span>
                    </div>
                    <div
                      className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                    >
                      <span>TOTAL TO PAY</span>
                      <b>KSh {orderData.total}</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer's Order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={orderData.user.image} alt="" />
                  <div>
                    <span>{orderData.user.name}</span>
                    <span>{orderData.user.email}</span>
                  </div>
                </div>
              </div>
              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                <span>
                  {orderData.shippingAddress.firstName}{" "}
                  {orderData.shippingAddress.lastName}
                </span>
                <span>{orderData.shippingAddress.area}</span>

                <span>{orderData.shippingAddress.residential}</span>
                <span>{orderData.shippingAddress.phoneNumber}</span>
              </div>
            </div>
            {/* {!orderData.isPaid && (
              <div className={styles.order__payment}>
                {orderData.paymentMethod == "mpesa" && (
                  <Mpesa orderData={orderData} />
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const id = query.id;
  const buni_client_id = process.env.BUNI_API_TOKEN;
  const order = await Order.findById(id)
    .populate({ path: "user", model: User })
    .lean();

  db.disconnectDb();
  return {
    props: {
      orderData: JSON.parse(JSON.stringify(order)),
      buni_client_id,
    
    },
  };
}
