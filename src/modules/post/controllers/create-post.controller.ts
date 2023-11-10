import { Request, Response } from "express";
import { CreatePostUseCase } from "../use-cases/create-post.use-case";
import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";

export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { body } = request;
    try {
      await this.createPostUseCase.execute(body);
      return response.status(201).send();
    } catch (error) {
      if (error instanceof BadRequestException) {
        return response.status(400).send({ message: error.message });
      }
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}
