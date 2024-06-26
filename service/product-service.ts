import { ApiError } from "../exceptions/api-errors";
import { productModel } from "../models/product-model";
import { transactionModel } from "../models/transaction-model";

class ProductService {
    async getAllProduct() {
        const product = await productModel.find();
        if (!product || product.length === 0) throw ApiError.BadRequest("bad request");
        return product;
    }
    async getAllTransactions() {
        const transactions = await transactionModel.find({
            date: {
                $gte: "2023-11-24",
                $lte: "2023-12-01",
            },
        });
        if (!transactions || transactions.length === 0) throw ApiError.BadRequest("bad request");
        return transactions;
    }
    async getTransactionsByProductId(id: string) {
        const transaction = await transactionModel.find({ product: id });
        if (!transaction || transaction.length === 0) throw ApiError.BadRequest("bad request");
        return transaction;
    }
    async getProductById(id: string) {
        const product = await productModel.find({ _id: id });
        if (!product || product.length === 0) throw ApiError.BadRequest("bad request");
        return product;
    }
}

export const productService = new ProductService();
