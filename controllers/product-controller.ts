import { productService } from "./../service/product-service";
import { NextFunction, Request, Response } from "express";

class ProductController {
    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllProduct();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
    async getTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.getAllTransactions();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
    async getTransactionsByProductId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const transaction = await productService.getTransactionsByProductId(id);
            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }
    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const product = await productService.getProductById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();
