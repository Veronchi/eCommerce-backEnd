import { Basket, Basket_product } from "../common/models";
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

export { addProduct };
