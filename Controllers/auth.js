import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiranmuttanwar@gmail.com",
    pass: "tvrp zarc zems dgoa",
  },
});

const getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1] === "true";
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1];

  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/login", {
    path: "/login",
    title: "Login",
    errorMessage: message,
  });
};
const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
            return res.redirect("/");
          }
          req.flash("error", "invalid email or password.");

          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

const getSignUp = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    title: "Signup",
    errorMessage: message,
  });
};
const postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "User with this email allready exists, please Login or use another email."
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          const mailOptions = {
            from: "Potatosshop@gmail.com",
            to: email,
            subject: "Signup succeded",
            html: "<h1>you have sucessfully signed up!</h1>",
          };
          res.redirect("/login");

          return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

const getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    title: "Reset Password",
    errorMessage: message,
  });
};

const postReset = (req, res, next) => {
  const { email } = req.body;
  //token generation
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }

    const token = buffer.toString("hex");
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          req.flash("error", "invalid Email-id, Please Enter Valid Email.");
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.expireToken = Date.now() + 360000;
        return user.save();
      })
      .then((result) => {
        const mailOptions = {
          from: "Potatosshop@gmail.com",
          to: email,
          subject: "Password Reset",
          html: `
          <p>As per our request for Reseting the password,
           please click below link to reset the password </p>

           <p> <a href="http://localhost:3000/reset/${token}">Click here</a></p>

           <h6>(This Link will only be Valid for 1hr).</h6>
          `,
        };
        res.redirect("/");
        return transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      })
      .catch((err) => console.log(err));
  });
};

const resetPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    expireToken: {
      $gt: Date.now(),
    },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }

      res.render("auth/reset-password", {
        path: "/reset-password",
        title: "Reset password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => console.log(err));
};

const postResetpassword = (req, res, next) => {
  const { password, confirmPassword, userId, passwordToken } = req.body;
  let resetUser;
  User.findOne({
    _id: userId,
    resetToken: passwordToken,
    expireToken: {
      $gt: Date.now(),
    },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.expireToken = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
export {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
  getReset,
  postReset,
  resetPassword,
  postResetpassword,
};
