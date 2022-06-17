import Express from "express";
import * as productService from "./product.service";

const router = Express.Router();

router.post("/", async (req, res, next) => {
  try {
    const body = req;
    const product = await productService.create(body);
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
