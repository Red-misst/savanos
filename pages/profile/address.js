import { getSession } from "next-auth/react";

import DotLoaderSpinner from "@/components/loaders/dotLoader";
import Layout from "@/components/profile/layout";
import User from "@/models/User";
import Area from "@/models/Area";
import Shipping from "@/components/checkout/shipping";
import styles from "@/styles/profile.module.scss";
import { useState } from "react";
export default function addresses({ user, tab, areas }) {
  const [addresses, setAddresses] = useState(user.address.address);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Layout session={user.user} tab={tab}>
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
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  //--------------
  const address = await User.findById(session.user.id).select("address").lean();
  const areas = await Area.find().lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
      areas: JSON.parse(JSON.stringify(areas)),
    },
  };
}
