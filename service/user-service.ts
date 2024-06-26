import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "./../models/user-model";
import { emailService } from "./email-service";
import { tokenService } from "./token-service";
import { UserDto } from "../dtos/user-dtos";
import { ApiError } from "../exceptions/api-errors";
class UserService {
    async registration(email: string, password: string) {
        const candidate = await userModel.findOne({ email });
        if (candidate) throw ApiError.BadRequest(`Пользователь с таким ${email} существует`);
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();
        const user = await userModel.create({ email, password: hashPassword, activationLink });
        await emailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activation/${activationLink}`
        );
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        if (userDto.id) await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async activate(activationLink: string) {
        const user = await userModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequest("Некорректная ссылка активации");
        user.isActivated = true;
        await user.save();
    }
    async login(email: string, password: string) {
        const user = await userModel.findOne({ email });
        if (!user) throw ApiError.BadRequest("Пользователь не найден");
        const isPasswordTrue = await bcrypt.compare(password, user.password);
        if (!isPasswordTrue) throw ApiError.BadRequest("Неверный пароль");
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        if (userDto.id) await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken: string) {
        if (!refreshToken) throw ApiError.UnAuthError();
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) throw ApiError.UnAuthError();
        if (typeof userData !== "string") {
            const user = await userModel.findById(userData.id);
            if (user) {
                const userDto = new UserDto(user);
                const tokens = tokenService.generateToken({ ...userDto });
                if (userDto.id) await tokenService.saveToken(userDto.id, tokens.refreshToken);
                return { ...tokens, user: userDto };
            }
        }
    }
    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }
}

export const userService = new UserService();
