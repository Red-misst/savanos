import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Empty from "@/components/cart/empty";
import Header from "@/components/cart/header";
import Footer from "@/components/footer";
import Product from "@/components/cart/product";
import styles from "@/styles/cart.module.scss";
import { updateCart } from "@/store/cartSlice";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import { women_swiper } from "@/data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/requests/user";
export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  //-----------------------
  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setShippingFee(30);
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);
  //-----------------------
  const saveCartToDbHandler = async () => {
    if (session) {
      setLoading(true);
      const res = saveCart(selected);
      // console.log(res);
    
      Router.push("/checkout");
      setLoading(false);
      return;
    } else {
      signIn();
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={`container-fluid ${styles.cart}`}>
        {cart.cartItems.length >= 1 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <ProductsSwiper
          products={women_swiper}
          header="Top Picks For You"
          bg="purple"
        />
        <Footer />
      </div>
    </>
  );
}

