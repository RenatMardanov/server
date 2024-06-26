import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/auth-middleware";
import { productController } from "../controllers/product-controller";

const router = Router();

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/products", authMiddleware, productController.getProducts);
router.get("/transactions/:id", authMiddleware, productController.getTransactionsByProductId);
router.get("/products/:id", authMiddleware, productController.getProductById);
router.get("/refresh", userController.refresh);
router.get("/activation/:link", userController.activate);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/transactions", authMiddleware, productController.getTransactions);

export default router;
