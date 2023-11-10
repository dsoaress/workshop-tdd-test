import { CreatePostController } from "./create-post.controller";
import { CreatePostUseCase } from "../use-cases/create-post.use-case";
import { Request } from "express";
import { makePost } from "../../../shared/tests/mocks/make-post";
import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";

describe("CreatePostController", () => {
  let createPostController: CreatePostController;
  let createPostUseCase: CreatePostUseCase;

  beforeEach(() => {
    createPostUseCase = {
      execute: jest.fn(),
    } as any as CreatePostUseCase;
    createPostController = new CreatePostController(createPostUseCase);
  });

  it("should be defined", () => {
    expect(createPostController).toBeDefined();
  });

  it("should create a post", async () => {
    jest.spyOn(createPostUseCase, "execute").mockResolvedValueOnce();
    const { title, excerpt, content } = makePost();
    const request = {
      body: { title, excerpt, content },
    } as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    await createPostController.execute(request, response);
    expect(createPostUseCase.execute).toHaveBeenCalledWith({ title, excerpt, content });
    expect(response.status).toHaveBeenCalledWith(201);
  });

  it("should return 400 if body data is invalid", async () => {
    jest.spyOn(createPostUseCase, "execute").mockRejectedValueOnce(new BadRequestException(""));
    const { excerpt, content } = makePost();
    const request = {
      body: { excerpt, content },
    } as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    await createPostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("should return 500 if any error occurs", async () => {
    jest.spyOn(createPostUseCase, "execute").mockRejectedValueOnce(new Error(""));
    const { title, excerpt, content } = makePost();
    const request = {
      body: { title, excerpt, content },
    } as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    await createPostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
