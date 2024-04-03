const handleError = (req, res, next) => {
  res.status(404).render("error/error.ejs", {
    title: " Page Not Found",
    path: "/error",
    isAuthenticated: req.isLoggedIn,
  });
};

export { handleError };
