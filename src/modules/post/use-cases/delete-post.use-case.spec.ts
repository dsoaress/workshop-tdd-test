import { PostRepository } from "../post.repository";
import { InMemoryPostRepository } from "../../../shared/tests/in-memory-repositories/in-memory-post.repository";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { DeletePostUseCase } from "./delete-post.use-case";
import { PostEntity } from "../post.entity";

describe("DeletePostUseCase", () => {
  let postRepository: PostRepository;
  let deletePostUseCase: DeletePostUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    deletePostUseCase = new DeletePostUseCase(postRepository);
  });

  it("should delete a post", async () => {
    await postRepository.create(new PostEntity(makePost()));
    const posts = await postRepository.findAll();
    expect(posts.length).toBe(1);
    const post = posts[0];
    await deletePostUseCase.execute(post.id);
    const postsAfterDelete = await postRepository.findAll();
    expect(postsAfterDelete.length).toBe(0);
  });

  it("should throw if post is not found", async () => {
    await expect(deletePostUseCase.execute("not-found")).rejects.toThrow();
  });
});
