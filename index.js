import express from "express";
import http from "http";
import bodyParser from "body-parser";
import shopRoutes from "./routes/shop.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { router } from "./routes/admin.js";
import { router as authRoutes } from "./routes/auth.js";
import { handleError } from "./Controllers/error.js";
import User from "./models/user.js";
import session from "express-session";
// import cookieParser from "cookie-parser";
import MongoDBStore from "connect-mongodb-session";
import mongoose from "mongoose";
import csrf from "csurf";
import flash from "connect-flash";
const MONGODB_URI =
  "mongodb+srv://Potato:viratkohli18@cluster0.psfzwfx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const mongoDBStore = MongoDBStore(session);
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});

const csrfProtection = csrf();
//EJS
app.set("view engine", "ejs");

app.set("views", "views");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
//remember flash need to be sied after created a session
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  } else {
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => console.log(err));
  }
});

//before all routes
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session && req.session.isLoggedIn === true;
  res.locals.csrfToken = req.csrfToken();
  next();
});
// app.use(cookieParser());
app.use(`/admin`, router);
app.use(shopRoutes);
app.use(authRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(handleError);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
