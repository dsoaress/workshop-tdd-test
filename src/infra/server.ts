import * as express from "express";
import { Express } from "express";
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
import { PostRepository } from "../modules/post/post.repository";

export function server(postRepository: PostRepository): Express {
  const app = express();
  app.use(express.json());

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

  app.get("/posts", findAllPostsController.execute.bind(findAllPostsController));
  app.get("/posts/:id", findOnePostController.execute.bind(findOnePostController));
  app.post("/posts", createPostController.execute.bind(createPostController));
  app.patch("/posts/:id", updatePostController.execute.bind(updatePostController));
  app.delete("/posts/:id", deletePostController.execute.bind(deletePostController));

  app.use((_request, response) => response.status(404).json({ message: "Not found" }));

  return app;
}
