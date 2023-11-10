import { PostEntity } from "../../../modules/post/post.entity";
import { PostRepository } from "../../../modules/post/post.repository";

export class InMemoryPostRepository implements PostRepository {
  private readonly posts: PostEntity[] = [];

  async findOne(id: string): Promise<PostEntity | undefined> {
    return this.posts.find((post) => post.id === id);
  }

  async findAll(): Promise<PostEntity[]> {
    return this.posts;
  }

  async create(post: PostEntity): Promise<void> {
    this.posts.push(post);
  }

  async update(post: PostEntity): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === post.id);
    this.posts[index] = post;
  }

  async delete(id: string): Promise<void> {
    const index = this.posts.findIndex((post) => post.id === id);
    this.posts.splice(index, 1);
  }
}
