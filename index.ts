import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router";
import { errorMidleWare } from "./middleware/error-middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use("/api", router);
app.use(errorMidleWare);

const PORT = process.env.PORT || "3000";

const start = async () => {
    try {
        if (process.env.DB_URL) {
            await mongoose.connect(process.env.DB_URL);
        }
        app.listen(+PORT, "localhost", () => console.log(`Server started on ${PORT} port`));
    } catch (error) {
        console.log(error);
    }
};
start();
