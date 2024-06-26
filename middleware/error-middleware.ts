import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-errors";

export function errorMidleWare(err: typeof Error, req: Request, res: Response, next: NextFunction) {
    console.log(err, "eeeee");
    next();
    if (err instanceof ApiError)
        res.status(err.status).json({ message: err.message, errors: err.errors });

    res.status(500).json("Непредвиденная ошибка");
}
