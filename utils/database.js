import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node-complete", "root", "viratkohli18", {
  dialect: "mysql",
  host: "localhost",
});

export { sequelize };

// import mysql from "mysql2";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "viratkohli18",
// });

// export default pool.promise();
