import { PostEntity } from "./post.entity";

export interface PostRepository {
  findOne(id: string): Promise<PostEntity | undefined>;
  findAll(): Promise<PostEntity[]>;
  create(post: PostEntity): Promise<void>;
  update(post: PostEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
