import Express from "express";
import * as categoryService from "./category.service";
import checkRoleMiddleware from "../../middleware/checkRoleMiddleware";

const router = Express.Router();

router.post("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const category = await categoryService.create(req.body);
    return res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getAll(req.body);
    return res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/get-category", async (req, res, next) => {
  try {
    const category = await categoryService.getOne(req.body);
    return res.json(category);
  } catch (error) {
    next(error);
  }
});

router.patch("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const category = await categoryService.update(req.body);
    return res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/", checkRoleMiddleware("ADMIN"), async (req, res, next) => {
  try {
    const category = await categoryService.remove(req.body);
    return res.json(category);
  } catch (error) {
    next(error);
  }
});

export default router;
