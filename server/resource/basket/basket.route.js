import Express from "express";
import * as basketService from "./basket.service";
import authMiddleware from "../../middleware/authMiddleware";

const router = Express.Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const result = await basketService.addProduct(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const result = await basketService.getProducts(req);
    return res.json(result);
  } catch (error) {
    next(error)
  }
});

export default router;
