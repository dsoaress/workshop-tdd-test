import { PostRepository } from "../post.repository";

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
