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
exports.prismaClient = void 0;
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
exports.prismaClient = new client_1.PrismaClient(); //should've made in clients/db but if its here still no worries
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, app_1.default)();
    app.listen(8000, () => {
        console.log("server running on port 8000");
    });
});
init();
