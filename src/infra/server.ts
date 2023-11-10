import * as express from "express";
import { InMemoryPostRepository } from "../shared/tests/stubs/in-memory-post.repository";
import { CreatePostUseCase } from "../modules/post/use-cases/create-post.use-case";
import { CreatePostController } from "../modules/post/controllers/create-post.controller";
import { FindAllPostsUseCase } from "../modules/post/use-cases/find-all-posts.use-case";
import { FindAllPostsController } from "../modules/post/controllers/find-all-posts.controller";
import { FindOnePostUseCase } from "../modules/post/use-cases/find-one-post.use-case";
import { FindOnePostController } from "../modules/post/controllers/find-one-post.controller";
import { UpdatePostUseCase } from "../modules/post/use-cases/update-post.use-case";
import { DeletePostUseCase } from "../modules/post/use-cases/delete-post.use-case";
import { UpdatePostController } from "../modules/post/controllers/update-post.controller";
import { DeletePostController } from "../modules/post/controllers/delete-post.controller";

const postRepository = new InMemoryPostRepository();

const createPostUseCase = new CreatePostUseCase(postRepository);
const findAllPostsUseCase = new FindAllPostsUseCase(postRepository);
const findOnePostUseCase = new FindOnePostUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);

const createPostController = new CreatePostController(createPostUseCase);
const findAllPostsController = new FindAllPostsController(findAllPostsUseCase);
const findOnePostController = new FindOnePostController(findOnePostUseCase);
const updatePostController = new UpdatePostController(updatePostUseCase);
const deletePostController = new DeletePostController(deletePostUseCase);

export function server() {
  const app = express();
  app.use(express.json());

  app.get("/posts", (request, response) => findAllPostsController.execute(request, response));
  app.get("/posts/:id", (request, response) => findOnePostController.execute(request, response));
  app.post("/posts", (request, response) => createPostController.execute(request, response));
  app.patch("/posts/:id", (request, response) => updatePostController.execute(request, response));
  app.delete("/posts/:id", (request, response) => deletePostController.execute(request, response));

  app.use((_request, response) => response.status(404).json({ message: "Not found" }));

  app.listen(3000, () => console.log("Server is running on port 3000"));
}
