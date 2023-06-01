import Layout from "@/components/storeAdmin/layout";
import CollapsibleTable from "@/components/storeAdmin/orders/table";
import db from "@/utils/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Store from "@/models/Store";
export default function orders({ orders }) {
  return (
    <Layout>
      <CollapsibleTable rows={orders} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  db.connectDb();
  const user = await User.findById(query.id).lean();
  const store = await Store.findOne({ seller: query.id }).lean();

  const orders = await Order.find({ "products.store": store._id })
    .populate({ path: "user", model: User, select: "name email image" })
    .sort({ createdAt: -1 })
    .lean();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
