import { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Layout from "@/components/storeAdmin/layout";
import User from "@/models/User";
import db from "@/utils/db";
import Order from "@/models/Order";
import Store from "@/models/Store";
import Product from "@/models/Product";

export default function Dashboard({ user, store, orders, products }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("day"); // Initial filter value

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const filteredOrders = orders.filter((order) => {
    // Apply the filtering logic based on the selected filter value
    // You can customize this logic based on your specific requirements
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - orderDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    switch (filter) {
      case "day":
        return daysDiff <= 1;
      case "week":
        return daysDiff <= 7;
      case "month":
        return daysDiff <= 30;
      default:
        return true; // No filtering
    }
  });

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout>
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={handleFilterChange} label="Filter">
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.totalSales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Layout>
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
