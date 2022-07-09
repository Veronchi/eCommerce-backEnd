import Express from "express";
import * as brandService from "./brand.service";
import checkRoleMiddleware from "../../middleware/checkRoleMiddleware";

const router = Express.Router();

router.post("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const brand = await brandService.create(req.body);
    return res.json(brand);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const brands = await brandService.getAll(req.body);
    return res.json(brands);
  } catch (error) {
    next(error);
  }
});

router.get("/get-brand", async (req, res, next) => {
  try {
    const brand = await brandService.getOne(req.body);
    return res.json(brand);
  } catch (error) {
    next(error);
  }
});

router.patch("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const brand = await brandService.update(req.body);
    return res.json(brand);
  } catch (error) {
    next(error);
  }
});

router.delete("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const brand = await brandService.remove(req.body);
    return res.json(brand);
  } catch (error) {
    next(error);
  }
});

export default router;
