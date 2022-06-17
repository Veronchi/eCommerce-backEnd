import { Product } from "../common/models";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";
import ApiError from "../../error/ApiError";

async function create(productData) {
  const { name, price, brandId, categoryId, productInfo } = productData.body;

  if (!productData.files) {
    return ApiError.badRequest("No files were uploaded");
  }

  const { img } = productData.files;
  let fileName = uuidv4() + ".jpg";
  img.mv(path.resolve(__dirname, "..", "..", "static", fileName));
  return await Product.create({
    name,
    price,
    brandId,
    categoryId,
    img: fileName,
  });
}


export { create };
