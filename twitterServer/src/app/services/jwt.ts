import { User } from "@prisma/client";
import { prismaClient } from "../..";
import { Jwt } from "jsonwebtoken";
import JWT from "jsonwebtoken";

export class JWTService {
  public static  generateTokenForUser(user :User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };
    const JWT_SECRET = process.env.JWT_SECRET_KEY || "";
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
}
