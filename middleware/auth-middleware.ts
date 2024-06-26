import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-errors";
import { tokenService } from "../service/token-service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(ApiError.UnAuthError());
        const accessToken = authHeader.split(" ")[1];
        if (!accessToken) return next(ApiError.UnAuthError());
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) return next(ApiError.UnAuthError());

        next();
    } catch (error) {
        return next(ApiError.UnAuthError());
    }
}
