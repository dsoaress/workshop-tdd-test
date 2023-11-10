import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { PostRepository } from "../post.repository";

interface Output {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FindOnePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<Output> {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException("Post not found");
    return post.toObject();
  }
}
