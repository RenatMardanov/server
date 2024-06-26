import jwt from "jsonwebtoken";
import { tokenModel } from "../models/token-model";
import { DtoUserModel, IUser } from "../types/types";

class TokenService {
    generateToken(payload: DtoUserModel) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN!, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN!, {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }
    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(token: string) {
        const tokenData = await tokenModel.findOne({ token });
        return tokenData;
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN!);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!);
            return userData;
        } catch (error) {
            return null;
        }
    }
}

export const tokenService = new TokenService();
