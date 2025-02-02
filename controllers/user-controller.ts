import { NextFunction, Request, Response } from "express";
import { userService } from "../service/user-service";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-errors";
import { itemService } from "../service/item-service";
import { transactionModel } from "../models/transaction-model";
import { itemModel } from "../models/item-model";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) next(ApiError.BadRequest("Ошибка регистрации", errors.array()));
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            console.log(activationLink);
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL!);
        } catch (error) {
            next(error);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            if (userData) {
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
            }

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
