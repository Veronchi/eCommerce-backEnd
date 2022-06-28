import { Product, Product_info } from "../common/models";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";
import ApiError from "../../error/ApiError";

async function create(productData) {
  const { name, price, brandId, categoryId, info } = productData.body;

  if (!productData.files) {
    return ApiError.badRequest("No files were uploaded");
  }

  const { img } = productData.files;
  let fileName = uuidv4() + ".jpg";
  img.mv(path.resolve(__dirname, "..", "..", "static", fileName));
  const product = await Product.create({
    name,
    price,
    BrandId: brandId,
    CategoryId: categoryId,
    img: fileName,
    info,
  });

  if (info) {
    info = JSON.parse(info);
    info.forEach((i) => {
      Product_info.create({
        title: i.title,
        description: i.description,
        ProductId: product.id,
      });
    });
  }

  return product;
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

async function getOne(productData) {
  const { id } = productData;
  const product = await Product.findOne({
    where: { id },
    include: [{ model: Product_info, as: "info" }],
  });

  return product;
}

export { create, getAll, getOne };
