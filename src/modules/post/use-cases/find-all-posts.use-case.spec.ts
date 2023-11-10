import { PostRepository } from "../post.repository";
import { InMemoryPostRepository } from "../../../shared/tests/in-memory-repositories/in-memory-post.repository";
import { makePost } from "../../../shared/tests/fakes/make-post";
import { FindAllPostsUseCase } from "./find-all-posts.use-case";
import { PostEntity } from "../post.entity";

describe("FindAllPostsUseCase", () => {
  let postRepository: PostRepository;
  let findAllPostsUseCase: FindAllPostsUseCase;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    findAllPostsUseCase = new FindAllPostsUseCase(postRepository);
  });

  it("should return all posts", async () => {
    const post = makePost();
    await postRepository.create(new PostEntity(post));
    const posts = await findAllPostsUseCase.execute();
    expect(posts.length).toBe(1);
  });
});
