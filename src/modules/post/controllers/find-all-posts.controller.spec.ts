import { Request, Response } from "express";

import { FindAllPostsController } from "./find-all-posts.controller";
import { FindAllPostsUseCase } from "../use-cases/find-all-posts.use-case";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";
import { PostEntity } from "../post.entity";

describe("FindAllPostsController", () => {
  let findAllPostsController: FindAllPostsController;
  let findAllPostsUseCase: FindAllPostsUseCase;

  const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

  beforeEach(() => {
    findAllPostsUseCase = { execute: jest.fn() } as any as FindAllPostsUseCase;
    findAllPostsController = new FindAllPostsController(findAllPostsUseCase);
  });

  it("should be defined", () => {
    expect(findAllPostsController).toBeDefined();
  });

  it("should find all posts", async () => {
    jest.spyOn(findAllPostsUseCase, "execute").mockResolvedValueOnce([new PostEntity(makePost())]);
    await findAllPostsController.execute({} as Request, response);
    expect(findAllPostsUseCase.execute).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 if any error occurs", async () => {
    jest.spyOn(findAllPostsUseCase, "execute").mockRejectedValueOnce(new Error(""));
    await findAllPostsController.execute({} as Request, response);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
