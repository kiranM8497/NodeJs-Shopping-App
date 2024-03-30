import mongoose from "mongoose";

//using schema constructor provided by  Mongoose
//which allows us to create new schemas
const Schema = mongoose.Schema;

//creating a new instance of the Schema object
//we are passing in an object which will define how our schema will look like

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
//We are exporting this model so that other modules can use it
//this method is called on every save operation
export default mongoose.model("Product", productSchema);

// import { mongoConnect, getDb } from "../utils/mongo_database.js";
// import mongodb from "mongodb";
// const ObjectId = mongodb.ObjectId;
// class Product {
//   constructor(title, imageUrl, price, description, id, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //id exists then update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       //create a new product
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         // console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         console.log("inside productjs model", product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then(() => {
//         console.log("Product deleted successfully");
//       })
//       .catch((err) => console.log(err));
//   }
// }

// export { Product };
