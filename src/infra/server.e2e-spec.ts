import * as request from "supertest";
import { Express } from "express";

import { server } from "./server";
import { makePost } from "../shared/tests/fakes/make-post";
import { PrismaClient } from "@prisma/client";
import { PrismaPostRepository } from "./database/prisma/repositories/prisma-post.repository";

describe("server", () => {
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    const postRepository = new PrismaPostRepository(prisma);
    app = server(postRepository);
  });

  beforeEach(async () => {
    await prisma.post.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a post", async () => {
    const { title, excerpt, content } = makePost();
    await request(app).post("/posts").send({ title, excerpt, content }).expect(201);
  });

  it("should delete a post", async () => {
    const { title, excerpt, content } = makePost();
    await request(app).post("/posts").send({ title, excerpt, content });
    const posts = await request(app).get("/posts");
    const { id } = posts.body[0];
    await request(app).delete(`/posts/${id}`).expect(204);
  });

  it("should update a post", async () => {
    const { title, excerpt, content } = makePost();
    await request(app).post("/posts").send({ title, excerpt, content });
    const posts = await request(app).get("/posts");
    const { id } = posts.body[0];
    await request(app).patch(`/posts/${id}`).send({ title: "new title" }).expect(204);
  });

  it("should return all posts", async () => {
    const { title, excerpt, content } = makePost();
    await request(app).post("/posts").send({ title, excerpt, content });
    const result = await request(app).get("/posts").expect(200);
    expect(result.body.length).toBe(1);
  });

  it("should return a post", async () => {
    const { title, excerpt, content } = makePost();
    await request(app).post("/posts").send({ title, excerpt, content });
    const posts = await request(app).get("/posts");
    const { id } = posts.body[0];
    const result = await request(app).get(`/posts/${id}`).expect(200);
    expect(result.body).toMatchObject({ id, title, excerpt, content });
  });

  it("should return 404 route not found", async () => {
    await request(app).get("/").expect(404);
  });


});
