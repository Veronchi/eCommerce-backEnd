import { Basket, Basket_product, Product } from "../common/models";
import Jwt from "jsonwebtoken";
import ApiError from "../../error/ApiError";

async function addProduct(basketData) {
  const { id } = basketData.body;
  const token = basketData.headers.authorization.split(" ")[1];
  const user = Jwt.verify(token, process.env.SECRET_KEY);
  const basket = await Basket.findOne({
    where: {
      UserId: user.id,
    },
  });
  await Basket_product.create({ BasketId: basket.id, ProductId: id });

  return "Item added to the cart";
}

async function getProducts(basketData) {
  const token = basketData.headers.authorization.split(" ")[1];
  const user = Jwt.verify(token, process.env.SECRET_KEY);
  const { id } = await Basket.findOne({ where: { UserId: user.id } });
  const basket = await Basket_product.findAll({ where: { BasketId: id } });

  const basketArr = [];

  for (let i = 0; i < basket.length; i++) {
    const productToBasket = await Product.findOne({
      where: {
        id: basket[i].ProductId,
      },
    });

    basketArr.push(productToBasket);
  }

  return basketArr;
}

export { addProduct, getProducts };
