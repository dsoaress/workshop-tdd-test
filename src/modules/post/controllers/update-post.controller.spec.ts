import { randomUUID } from "node:crypto";

import { Request, Response } from "express";

import { UpdatePostController } from "./update-post.controller";
import { UpdatePostUseCase } from "../use-cases/update-post.use-case";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

describe("UpdatePostController", () => {
  let updatePostController: UpdatePostController;
  let updatePostUseCase: UpdatePostUseCase;

  const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

  beforeEach(() => {
    updatePostUseCase = { execute: jest.fn() } as any as UpdatePostUseCase;
    updatePostController = new UpdatePostController(updatePostUseCase);
  });

  it("should be defined", () => {
    expect(updatePostController).toBeDefined();
  });

  it("should update a post", async () => {
    jest.spyOn(updatePostUseCase, "execute").mockResolvedValueOnce();
    const id = randomUUID();
    const { title, excerpt, content } = makePost();
    const request = { body: { title, excerpt, content }, params: { id } } as unknown as Request;
    await updatePostController.execute(request, response);
    expect(updatePostUseCase.execute).toHaveBeenCalledWith({ id, title, excerpt, content });
    expect(response.status).toHaveBeenCalledWith(204);
  });

  it("should return 400 if body data is invalid", async () => {
    jest.spyOn(updatePostUseCase, "execute").mockRejectedValueOnce(new BadRequestException(""));
    const id = randomUUID();
    const { title, excerpt, content } = makePost();
    const request = { body: { title, excerpt, content }, params: { id } } as unknown as Request;
    await updatePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 if post is not found", async () => {
    jest.spyOn(updatePostUseCase, "execute").mockRejectedValueOnce(new NotFoundException(""));
    const id = randomUUID();
    const { title, excerpt, content } = makePost();
    const request = { body: { title, excerpt, content }, params: { id } } as unknown as Request;
    await updatePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(404);
  });

  it("should return 500 if any error occurs", async () => {
    jest.spyOn(updatePostUseCase, "execute").mockRejectedValueOnce(new Error(""));
    const id = randomUUID();
    const { title, excerpt, content } = makePost();
    const request = { body: { title, excerpt, content }, params: { id } } as unknown as Request;
    await updatePostController.execute(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
