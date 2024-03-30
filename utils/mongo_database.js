// import mongodb from "mongodb";

// const MongoClient = mongodb.MongoClient;
// const username = encodeURIComponent("Potato");
// const password = encodeURIComponent("viratkohli18");
// const URI = `mongodb+srv://${username}:${password}@cluster0.psfzwfx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`;
// let _db;
// const mongoConnect = (callback) => {
//   MongoClient.connect(URI)
//     .then((client) => {
//       console.log("connected");
//       _db = client.db();
//       callback();
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found";
// };

// export { mongoConnect, getDb };
