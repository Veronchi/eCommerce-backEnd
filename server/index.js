import express from "express";
import cors from 'cors'
import sequelize from "./db";
import userRoute from './resource/user/user.routes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);

// sequelize.authenticate();

sequelize
  .sync()
  .then((data) => {
    // sequelize.drop().then((data) => {
    //     console.log("Done");
    // })
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
