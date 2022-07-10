import Express from "express";
import * as basketService from "./basket.service";
import authMiddleware from "../../middleware/authMiddleware";

const router = Express.Router();

router.post("/", authMiddleware, async(req, res, next) =>{
  try {
    const result = await basketService.create(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
})

export default router;