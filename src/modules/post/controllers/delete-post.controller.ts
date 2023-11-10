import { Request, Response } from "express";
import { DeletePostUseCase } from "../use-cases/delete-post.use-case";

export class DeletePostController {
  constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      await this.deletePostUseCase.execute(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}
