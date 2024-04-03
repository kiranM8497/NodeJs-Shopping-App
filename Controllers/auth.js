const getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").trim().split("=")[1] === "true";
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    title: "Login",
    isAuthenticated: isLoggedIn,
  });
};
const postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};

export { getLogin, postLogin };
