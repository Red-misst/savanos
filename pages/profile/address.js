import { getSession } from "next-auth/react";
import Header from "@/components/Header";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import User from "@/models/User";
import Area from "@/models/Area";
import Shipping from "@/components/checkout/shipping";
import styles from "@/styles/profile.module.scss";
import { useState } from "react";
export default function addresses({ user, areas }) {
  
  const [addresses, setAddresses] = useState(user.address.address);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
  <Header setLoading={setLoading} />
      <div className={styles.header}>
        <h1>MY ADDRESSES</h1>
      </div>
      <Shipping
        areas={areas}
        user={user}
        addresses={addresses}
        setAddresses={setAddresses}
        setLoading={setLoading}
      />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });

  //--------------
  const address = await User.findById(session.user.id).select("address").lean();
  const areas = await Area.find().lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },

      areas: JSON.parse(JSON.stringify(areas)),
    },
  };
}
