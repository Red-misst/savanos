import { getSession } from "next-auth/react";
import Layout from "@/components/profile/layout";
import Head from "next/head";
export default function profile({ user, tab }) {
  return (
    <>

      <Head>
        <title>{user.name} -profile</title>
      </Head> 
      <Layout session={user.user} tab={tab}></Layout>;
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: { user: session, tab },
  };
}
