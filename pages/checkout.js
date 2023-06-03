import { useState, useEffect } from "react";
import styles from "@/styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import Area from "@/models/Area";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import Header from "@/components/cart/header";
import Shipping from "@/components/checkout/shipping";
import Products from "@/components/checkout/products";
import Payment from "@/components/checkout/payment";
import Summary from "@/components/checkout/summary";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import { deliveryFee } from "@/requests/user";

export default function checkout({ cart, user, areas }) {
  const [delivery, setDelivery] = useState("0");
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let activeAddress = addresses.find((ad) => ad.active == true);

    if (activeAddress) {
      setSelectedAddress(activeAddress);
      getShipping(activeAddress);
    } else {
      setSelectedAddress("");
    }
    console.log(addresses);
  }, [addresses]);

  const getShipping = async (activeAddress) => {
    const res = await deliveryFee(activeAddress);

    setDelivery(res);
    return;
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header setLoading={setLoading} />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
            loading={loading}
            setLoading={setLoading}
            areas={areas}
            setDelivery={setDelivery}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
            delivery={delivery}
            setLoading={setLoading}
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);

  const user = await User.findById(session.user.id);

  const cart = await Cart.findOne({ user: user.id });
  const areas = await Area.find().lean();

  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      areas: JSON.parse(JSON.stringify(areas)),
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
