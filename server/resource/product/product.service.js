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
    BrandId: brandId,
    CategoryId: categoryId,
    img: fileName,
  });
}

async function getAll(productData) {
  const { brandId, categoryId } = productData;
  let product;
  console.log(productData);
  if (!brandId && !categoryId) {
    product = await Product.findAll();
  } else if (brandId && !categoryId) {
    product = await Product.findAll({
      where: { BrandId: brandId },
    });
  } else if (!brandId && categoryId) {
    product = await Product.findAll({
      where: { CategoryId: categoryId },
    });
  } else if (brandId && categoryId) {
    product = await Product.findAll({
      where: {
        BrandId: brandId,
        CategoryId: categoryId,
      },
    });
  }

  return product;
}

export { create, getAll };
