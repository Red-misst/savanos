import nc from "next-connect";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import auth from "@/middleware/auth";
const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { cart } = req.body;
    console.log(cart)
    let products = [];
    let user = await User.findById(req.user);

    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.store= dbProduct.store;
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price * ((100 - Number(subProduct.discount)) / 100)).toFixed(2)
          : price.toFixed(2);

      products.push(tempProduct);
    }
    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].qty;
    }

    let existing_cart = await Cart.findOne({ user: user });

    if (existing_cart) {
      let updatedCart = await Cart.findByIdAndUpdate(
        existing_cart._id,
        {
          products,
          cartTotal: cartTotal.toFixed(2),
        },
        {
          new: true,
        }
      );
      return res.json({ message: "Cart updated successfully" });
     
    } else {
      let newCart = await new Cart({
        products,
        cartTotal: cartTotal.toFixed(2),
        user: user._id,
      }).save();
    
      return res.json({ message: "Cart saved successfully" });
    }

    console.log(success);
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
