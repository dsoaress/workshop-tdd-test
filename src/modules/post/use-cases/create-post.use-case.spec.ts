import { PostRepository } from "../post.repository";
import { InMemoryPostRepository } from "../../../shared/tests/in-memory-repositories/in-memory-post.repository";
import { CreatePostUseCase } from "./create-post.use-case";
import { makePost } from "../../../shared/tests/fakes/make-post";

describe("CreatePostUseCase", () => {
  let postRepository: PostRepository;
  let createPostUseCase: CreatePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    createPostUseCase = new CreatePostUseCase(postRepository);
  });

  it("should create a post", async () => {
    const { title, excerpt, content } = makePost();
    await createPostUseCase.execute({ title, excerpt, content });
    const posts = await postRepository.findAll();
    expect(posts.length).toBe(1);
  });

  it("should throw an error if title is invalid", async () => {
    const { title, excerpt, content } = makePost({ title: "" });
    await expect(createPostUseCase.execute({ title, excerpt, content })).rejects.toThrow();
  });

  it("should throw an error if excerpt is invalid", async () => {
    const { title, excerpt, content } = makePost({ excerpt: "" });
    await expect(createPostUseCase.execute({ title, excerpt, content })).rejects.toThrow();
  });

  it("should throw an error if content is invalid", async () => {
    const { title, excerpt, content } = makePost({ content: "" });
    await expect(createPostUseCase.execute({ title, excerpt, content })).rejects.toThrow();
  });
});
