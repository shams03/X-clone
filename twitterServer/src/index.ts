import initServer from "./app";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();
const init = async () => {
  const app = await initServer();


  app.listen(8000, () => {
    console.log("server running on port 8000");
  });
};
init();
