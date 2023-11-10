import { Request, Response } from "express";
import { FindAllPostsUseCase } from "../use-cases/find-all-posts.use-case";

export class FindAllPostsController {
  constructor(private readonly findAllPostsUseCase: FindAllPostsUseCase) {}

  async execute(_request: Request, response: Response): Promise<Response> {
    try {
      const posts = await this.findAllPostsUseCase.execute();
      return response.status(200).send(posts);
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}
