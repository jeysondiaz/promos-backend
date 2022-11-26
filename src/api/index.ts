import { Router } from "express";
import UserRouter from "./auth";
import CategoryRouter from "./category";
import CommerceRouter from "./commerce";
import ProductRouter from "./product";

const router = Router();

router.use("/auth", UserRouter);
router.use("/category", CategoryRouter);
router.use("/commerce", CommerceRouter);
router.use("/product", ProductRouter);

export default router;
