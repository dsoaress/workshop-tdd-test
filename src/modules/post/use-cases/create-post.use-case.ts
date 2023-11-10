import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";
import { postConfig } from "../post.config";
import { PostEntity } from "../post.entity";
import { PostRepository } from "../post.repository";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    title,
    excerpt,
    content,
  }: {
    title: string;
    excerpt: string;
    content: string;
  }): Promise<void> {
    const errors: string[] = [];
    if (!this.isValidTitle(title)) errors.push("Invalid title");
    if (!this.isValidExcerpt(excerpt)) errors.push("Invalid excerpt");
    if (!this.isValidContent(content)) errors.push("Invalid content");
    if (errors.length) throw new BadRequestException(errors.join(", "));
    const post = new PostEntity({ title, excerpt, content });
    await this.postRepository.create(post);
  }

  private isValidTitle(title?: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.title;
    if (!title || title.length < MIN_LENGTH || title.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidExcerpt(excerpt?: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.excerpt;
    if (!excerpt || excerpt.length < MIN_LENGTH || excerpt.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidContent(content?: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.content;
    if (!content || content.length < MIN_LENGTH || content.length > MAX_LENGTH) return false;
    return true;
  }
}
