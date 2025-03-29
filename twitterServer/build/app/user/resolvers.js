"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("../..");
const jwt_1 = require("../services/jwt");
const queries = {
    verifyGoogleToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        const googleAuthBaseUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleAuthBaseUrl.searchParams.set("id_token", token);
        const { data } = yield axios_1.default.get(googleAuthBaseUrl.toString(), {
            responseType: "json",
        });
        const user = yield __1.prismaClient.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            yield __1.prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageUrl: data.picture || "",
                },
            });
        }
        const userInDb = yield __1.prismaClient.user.findUnique({ where: { email: data.email } });
        if (!userInDb) {
            throw new Error("User not found");
        }
        const newToken = jwt_1.JWTService.generateTokenForUser(userInDb);
        console.log(data);
        console.log(newToken);
        return newToken;
    }),
};
exports.resolvers = { queries };
