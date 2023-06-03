import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import ShippingInput from "@/components/inputs/shippingInput";
import { applyCoupon } from "@/requests/user";
import axios from "axios";
import Router from "next/router";
export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,

  delivery,
  setLoading,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Pleace enter a coupon first !"),
  });
  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      toast.error(res.message);

      return;
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);

      return;
    }
  };
  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        toast.error("Please choose a payment method.");

        return;
      } else if (!selectedAddress) {
        toast.error("Please choose a shipping address.");

        return;
      }

      const data = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        delivery: delivery,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      setLoading(true);
      Router.push(`/order/${data.data.orderId}`);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            applyCouponHandler();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="*Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className={styles.apply_btn} type="submit">
                Apply
              </button>
              <div className={styles.infos}>
                <span>
                  Shipping fee : <b>+ KSh {delivery}</b>
                </span>
                <span>
                  Total : <b>KSh {`${cart.cartTotal + delivery}`}</b>
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      New price :<b>KSh {`${totalAfterDiscount + delivery}`}</b>
                    </span>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
        Place Order
      </button>
    </div>
  );
}
