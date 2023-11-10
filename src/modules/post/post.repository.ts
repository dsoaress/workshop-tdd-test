import { PostEntity } from "./post.entity";

export abstract class PostRepository {
  abstract findOne(id: string): Promise<PostEntity | undefined>;
  abstract findAll(): Promise<PostEntity[]>;
  abstract create(post: PostEntity): Promise<void>;
  abstract update(post: PostEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
