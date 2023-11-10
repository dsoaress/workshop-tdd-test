import { Request, Response } from "express";
import { UpdatePostUseCase } from "../use-cases/update-post.use-case";
import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

export class UpdatePostController {
  constructor(private readonly updatePostUseCase: UpdatePostUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const {
      body,
      params: { id },
    } = request;
    try {
      await this.updatePostUseCase.execute({ id, ...body });
      return response.status(204).send();
    } catch (error) {
      if (error instanceof BadRequestException) {
        return response.status(400).send({ message: error.message });
      }
      if (error instanceof NotFoundException) {
        return response.status(404).send({ message: error.message });
      }
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}
