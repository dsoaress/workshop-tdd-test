import { randomUUID } from "node:crypto";

import { Request, Response } from "express";

import { FindOnePostController } from "./find-one-post.controller";
import { FindOnePostUseCase } from "../use-cases/find-one-post.use-case";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { PostEntity } from "../post.entity";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

describe("FindOnePostController", () => {
  let findOnePostController: FindOnePostController;
  let findOnePostUseCase: FindOnePostUseCase;

  const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

  beforeEach(() => {
    findOnePostUseCase = { execute: jest.fn() } as any as FindOnePostUseCase;
    findOnePostController = new FindOnePostController(findOnePostUseCase);
  });

  it("should be defined", () => {
    expect(findOnePostController).toBeDefined();
  });

  it("should find one post", async () => {
    const id = randomUUID();
    jest
      .spyOn(findOnePostUseCase, "execute")
      .mockResolvedValueOnce(new PostEntity(makePost({ id })));
    const request = { params: { id } } as unknown as Request;
    await findOnePostController.execute(request, response);
    expect(findOnePostUseCase.execute).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it("should return 400 if id is invalid", async () => {
    jest.spyOn(findOnePostUseCase, "execute").mockRejectedValueOnce(new NotFoundException(""));
    const request = { params: { id: "invalid-id" } } as unknown as Request;
    await findOnePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(404);
  });

  it("should return 500 if any error occurs", async () => {
    jest.spyOn(findOnePostUseCase, "execute").mockRejectedValueOnce(new Error(""));
    const request = { params: { id: "invalid-id" } } as unknown as Request;
    await findOnePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
