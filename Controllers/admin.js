import Product from "../models/product.js";
import { validationResult } from "express-validator";

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    title: "Add-product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  //collecting errors by passing req to validationResult
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      title: "Add-product",
      path: "/admin/edit-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      console.log("product is created");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const prodId = req.body.productId;
  //collecting errors by passing req to validationResult
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      title: "Edit-product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        _id: prodId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;

      return product.save().then((result) => {
        console.log("Updated!");
        res.redirect("/admin/products");
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

const deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        title: "Edit-product",
        path: "/admin/edit-product",
        editing: editMode,
        hasError: false,
        product: product,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .populate("userId") // fetching user object  userid to populate related field adn related data
    // .populate("userId", "email") //specifially asking to ftech only name
    // .select(" title price desciption -_id")  // excluding _id from the result ad controlling which fields are returned
    .then((products) => {
      // console.log(products);
      res.render("admin/products.ejs", {
        path: "/admin/products",
        title: "Products",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

export {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
