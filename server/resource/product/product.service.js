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
  let { brandId, categoryId, limit, page } = productData;
  page = page || 1;
  limit = limit || 10;
  let offset = page * limit - limit;
  let product;
  
  if (!brandId && !categoryId) {
    product = await Product.findAndCountAll({ limit, offset });
  } else if (brandId && !categoryId) {
    product = await Product.findAndCountAll({
      where: { BrandId: brandId },
      limit,
      offset,
    });
  } else if (!brandId && categoryId) {
    product = await Product.findAndCountAll({
      where: { CategoryId: categoryId },
      limit,
      offset,
    });
  } else if (brandId && categoryId) {
    product = await Product.findAndCountAll({
      where: {
        BrandId: brandId,
        CategoryId: categoryId,
      },
      limit,
      offset,
    });
  }

  return product;
}

export { create, getAll };
