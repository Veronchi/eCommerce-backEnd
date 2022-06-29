import Express from "express";
import * as userService from "./user.service";
const router = Express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await userService.read(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/registration", async (req, res, next) => {
  try {
    const token = await userService.registration(req.body);
    res.json({token});
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
