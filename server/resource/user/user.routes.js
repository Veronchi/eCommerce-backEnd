import Express from "express";
import * as userService from "./user.service";
import authMiddleware from "../../middleware/authMiddleware";

const router = Express.Router();

router.post("/registration", async (req, res, next) => {
  try {
    const token = await userService.registration(req.body);
    res.json({token});
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const token = await userService.login(req.body);
    res.json({token});
  } catch (error) {
    next(error);
  }
});

router.get("/auth", authMiddleware, async (req, res, next) => {
  try {
    const token = await userService.check(req.body);
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
