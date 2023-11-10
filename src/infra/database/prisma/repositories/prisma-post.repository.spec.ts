import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

import { PrismaPostRepository } from "./prisma-post.repository";
import { makePost } from "../../../../shared/tests/fakes/make-post";
import { PostEntity } from "../../../../modules/post/post.entity";
import { PostRepository } from "../../../../modules/post/post.repository";

describe("PrismaPostRepository", () => {
  const db = Array.from({ length: 5 }, () => new PostEntity(makePost())).map((post) =>
    post.toObject()
  );
  let prismaPostRepository: PostRepository;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prisma = mockDeep<PrismaClient>();
    prismaPostRepository = new PrismaPostRepository(prisma);
  });

  it("should return a post", async () => {
    prisma.post.findUnique.mockResolvedValueOnce(db[0]);
    const post = await prismaPostRepository.findOne(db[0].id);
    const notFound = await prismaPostRepository.findOne("not-found");
    expect(post).toEqual(new PostEntity(db[0]));
    expect(notFound).toBeUndefined();
  });

  it("should return all posts", async () => {
    prisma.post.findMany.mockResolvedValueOnce(db);
    const posts = await prismaPostRepository.findAll();
    expect(posts).toEqual(db.map((post) => new PostEntity(post)));
  });

  it("should create a post", async () => {
    const post = new PostEntity(makePost());
    await prismaPostRepository.create(post);
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: post.toObject(),
    });
  });

  it("should update a post", async () => {
    const post = new PostEntity(makePost());
    await prismaPostRepository.update(post);
    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: post.id },
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        updatedAt: post.updatedAt,
      },
    });
  });

  it("should delete a post", async () => {
    await prismaPostRepository.delete(db[0].id);
    expect(prisma.post.delete).toHaveBeenCalledWith({
      where: { id: db[0].id },
    });
  });
});
