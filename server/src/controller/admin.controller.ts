import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helper/customError";
import { compareHashPassword } from "../helper/bcrypt";
import { User } from "../models/user.model";
import {
  checkToken,
  generateAccessToken,
  generateRefreshToken,
} from "../helper/jwt";
import { AdminValidation } from "../validations/admin.validation";

export const adminController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await AdminValidation.loginAdmin(req.body);

      const user = await User.findOne({
        where: { email: email },
        raw: true,
      });

      if (!user) {
        throw new CustomError(
          `User does not exists with this email: ${email}`,
          400
        );
      }

      const isEqual = compareHashPassword(password, user?.password);
      if (!isEqual) {
        throw new CustomError("Password is incorrect!", 400);
      }

      const targetUser = await User.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
        raw: true,
      });

      res.status(200).json({
        ok: true,
        message: "Login successfully",
        user: targetUser,
        accssToken: generateAccessToken({ userId: user?.id }),
        refreshToken: generateRefreshToken({ userId: user?.id }),
      });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req?.userId;

      const targetUser = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({
        ok: true,
        user: targetUser,
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new CustomError("Refresh token not found!", 401);
      }

      const isValid = checkToken(refreshToken);
      if (!isValid) {
        throw new CustomError("Refresh token is invalid!", 401);
      }

      const targetUser = await User.findOne({
        where: {
          // @ts-ignore
          id: isValid.userId,
        },
        raw: true,
      });

      if (!targetUser) {
        throw new CustomError("User not found with this token!", 401);
      }

      res.status(200).json({
        ok: true,
        accessToken: generateAccessToken({ userId: targetUser.id }),
      });
    } catch (error) {
      next(error);
    }
  },
};
