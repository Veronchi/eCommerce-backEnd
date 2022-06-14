import Express from "express";
import * as userService from "./user.service";
import ApiError from "../../error/ApiError";

const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await userService.read(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const updUser = await userService.update(req.body);
    res.json(updUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const user = await userService.remove(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
