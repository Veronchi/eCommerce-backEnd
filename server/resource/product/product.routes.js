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

router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getAll(req.query);
    return res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productService.getOne(req.params);
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;
