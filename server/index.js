import express from "express";
import cors from "cors";
import sequelize from "./db";
import fileUpload from "express-fileupload";
import path from "node:path";
import userRoute from "./resource/user/user.routes";
import categoryRoute from "./resource/category/category.routes";
import brandRoute from "./resource/brand/brand.routes";
import productRoute from "./resource/product/product.routes";
import basketRoute from "./resource/basket/basket.route";
import errorHadler from './middleware/ErrorHandlingMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({createParentPath: true}));
app.use('/api/user', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/brand', brandRoute);
app.use('/api/product', productRoute);
app.use('/api/basket', basketRoute);


app.use(errorHadler);

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
