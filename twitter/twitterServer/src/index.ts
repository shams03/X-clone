import initServer from "./app";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient(); //should've made in clients/db but if its here still no worries
const init = async () => {
  const app = await initServer();

  app.listen(8000, () => {
    console.log("server running on port 8000");
  });
};
init();
