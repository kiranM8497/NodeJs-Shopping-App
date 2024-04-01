const getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    title: "login",
  });
};

export { getLogin };
