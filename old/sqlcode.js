// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then((result) => {
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({
//         name: "Potato",
//         email: "potato@gmail.com",
//       });
//     }

//     return user;
//   })
//   .then((user) => {
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       //adding user to req
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err)); // 1 is the id of admin user
// });
