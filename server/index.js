import express from "express";
import sequelize from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then((data) => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
