import { randomUUID } from "node:crypto";

import { PostRepository } from "../post.repository";
import { InMemoryPostRepository } from "../../../shared/tests/stubs/in-memory-post.repository";
import { makePost } from "../../../shared/tests/mocks/make-post";
import { PostEntity } from "../post.entity";
import { FindOnePostUseCase } from "./find-one-post.use-case";

describe("FindOnePostUseCase", () => {
  let postRepository: PostRepository;
  let findOnePostUseCase: FindOnePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    findOnePostUseCase = new FindOnePostUseCase(postRepository);
  });

  it("should return a post", async () => {
    const id = randomUUID();
    const post = makePost({ id });
    await postRepository.create(new PostEntity(post));
    const foundPost = await findOnePostUseCase.execute(id);
    expect(foundPost).toBeDefined();
  });

  it("should throw an error if post is not found", async () => {
    const id = randomUUID();
    await expect(findOnePostUseCase.execute(id)).rejects.toThrow();
  });
});
