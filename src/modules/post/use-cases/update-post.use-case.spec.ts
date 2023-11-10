import { PostRepository } from "../post.repository";
import { InMemoryPostRepository } from "../../../shared/tests/in-memory-repositories/in-memory-post.repository";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { PostEntity } from "../post.entity";
import { UpdatePostUseCase } from "./update-post.use-case";

describe("UpdatePostUseCase", () => {
  let postRepository: PostRepository;
  let updatePostUseCase: UpdatePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    updatePostUseCase = new UpdatePostUseCase(postRepository);
  });

  it("should update a post", async () => {
    await postRepository.create(new PostEntity(makePost()));
    const posts = await postRepository.findAll();
    const { id } = posts[0].toObject();
    const { title, excerpt, content } = makePost();
    await updatePostUseCase.execute({ id, title, excerpt, content });
    const postAfterUpdate = await postRepository.findOne(id);
    expect(postAfterUpdate).toMatchObject({ id, title, excerpt, content });
  });

  it("should throw an error if post is not found", async () => {
    const { title, excerpt, content } = makePost();
    await expect(updatePostUseCase.execute({ id: "", title, excerpt, content })).rejects.toThrow();
  });

  it("should throw an error if title is invalid", async () => {
    await postRepository.create(new PostEntity(makePost()));
    const posts = await postRepository.findAll();
    const { id } = posts[0].toObject();
    await expect(updatePostUseCase.execute({ id, title: "" })).rejects.toThrow();
    await expect(updatePostUseCase.execute({ id, title: "a".repeat(256) })).rejects.toThrow();
  });

  it("should throw an error if excerpt is invalid", async () => {
    await postRepository.create(new PostEntity(makePost()));
    const posts = await postRepository.findAll();
    const { id } = posts[0].toObject();
    await expect(updatePostUseCase.execute({ id, excerpt: "" })).rejects.toThrow();
    await expect(updatePostUseCase.execute({ id, excerpt: "a".repeat(256) })).rejects.toThrow();
  });

  it("should throw an error if content is invalid", async () => {
    await postRepository.create(new PostEntity(makePost()));
    const posts = await postRepository.findAll();
    const { id } = posts[0].toObject();
    await expect(updatePostUseCase.execute({ id, content: "" })).rejects.toThrow();
    await expect(updatePostUseCase.execute({ id, content: "a".repeat(5001) })).rejects.toThrow();
  });
});
