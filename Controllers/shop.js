import Order from "../models/order.js";
import Product from "../models/product.js";

const fetchProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        title: "All products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const fetchProductDetails = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        title: product.title,
        product: product,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

const getIndexPage = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        title: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

const getCartDetails = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      // console.log("here is ", user.cart.items);
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        title: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

const deleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

const postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      console.log(user.cart.items);
      const products = user.cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

//get access to the products in the cart

const getOrderDetails = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log("here are orders", orders);
      res.render("shop/orders", {
        path: "/orders",
        title: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

export {
  fetchProducts,
  getIndexPage,
  getCartDetails,
  getOrderDetails,
  fetchProductDetails,
  postCart,
  deleteProductFromCart,
  postOrder,
};
