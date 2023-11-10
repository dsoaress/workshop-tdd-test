import { randomUUID } from "node:crypto";

import { Request, Response } from "express";

import { DeletePostController } from "./delete-post.controller";
import { DeletePostUseCase } from "../use-cases/delete-post.use-case";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

describe("DeletePostController", () => {
  let deletePostController: DeletePostController;
  let deletePostUseCase: DeletePostUseCase;

  const id = randomUUID();
  const request = { params: { id } } as unknown as Request;
  const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

  beforeEach(() => {
    deletePostUseCase = { execute: jest.fn() } as unknown as DeletePostUseCase;
    deletePostController = new DeletePostController(deletePostUseCase);
  });

  it("should be defined", () => {
    expect(deletePostController).toBeDefined();
  });

  it("should delete a post", async () => {
    jest.spyOn(deletePostUseCase, "execute").mockResolvedValueOnce();
    await deletePostController.execute(request, response);
    expect(deletePostUseCase.execute).toHaveBeenCalledWith(id);
    expect(response.status).toHaveBeenCalledWith(204);
  });

  it("should return 404 if post is not found", async () => {
    jest.spyOn(deletePostUseCase, "execute").mockRejectedValueOnce(new NotFoundException(""));
    await deletePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(404);
  });

  it("should return 500 if any error occurs", async () => {
    jest.spyOn(deletePostUseCase, "execute").mockRejectedValueOnce(new Error(""));
    await deletePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
