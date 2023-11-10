import "dotenv/config";

import { server } from "./infra/server";
import { PrismaPostRepository } from "./infra/database/prisma/repositories/prisma-post.repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const postRepository = new PrismaPostRepository(prisma);
server(postRepository).listen(3000, () => console.log("Server is running on port 3000"));
