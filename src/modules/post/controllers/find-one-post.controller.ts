import { Request, Response } from "express";
import { FindOnePostUseCase } from "../use-cases/find-one-post.use-case";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

export class FindOnePostController {
  constructor(private readonly findOnePostUseCase: FindOnePostUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const post = await this.findOnePostUseCase.execute(id);
      return response.status(200).send(post);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).send({ message: error.message });
      }
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}
