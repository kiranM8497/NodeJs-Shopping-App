import express from "express";
import http from "http";
import bodyParser from "body-parser";
import shopRoutes from "./routes/shop.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { router } from "./routes/admin.js";
import { authRoutes } from "./routes/auth.js";
import { handleError } from "./Controllers/error.js";
import User from "./models/user.js";

import mongoose from "mongoose";

const app = express();
//EJS
app.set("view engine", "ejs");

// pug
//here we are telling express that want to compile dynamic templates with pug engine
//app.set("view engine", "pug");

//and where to find this template although views is dfault incase we store in different folder then
// have to set it like this
app.set("views", "views");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findById("6607e202fc626bbbae724ac2")
    .then((user) => {
      //adding user to req
      //keep in mind this user is an full mongoose model
      //ao we can call every model functions on it;
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); // 1 is the id of admin user
});

app.use(authRoutes);
app.use(`/admin`, router);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(handleError);

mongoose
  .connect(
    "mongodb+srv://Potato:viratkohli18@cluster0.psfzwfx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "potato",
          email: "potato@gmail.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((error) => {
    console.log;
  });
