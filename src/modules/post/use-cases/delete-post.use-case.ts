import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { PostRepository } from "../post.repository";

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    const postExists = await this.postRepository.findOne(id);
    if (!postExists) throw new NotFoundException("Post not found");
    await this.postRepository.delete(id);
  }
}
