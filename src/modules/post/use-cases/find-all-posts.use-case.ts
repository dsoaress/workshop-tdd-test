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

export class FindAllPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<Output[]> {
    return this.postRepository.findAll().then((posts) => posts.map((post) => post.toObject()));
  }
}
