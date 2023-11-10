import { BadRequestException } from "../../../shared/exceptions/bad-request.exception";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { postConfig } from "../post.config";
import { PostRepository } from "../post.repository";

interface Input {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
}

export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ id, title, excerpt, content }: Input): Promise<void> {
    const errors: string[] = [];
    if (!this.isValidTitle(title)) errors.push("Invalid title");
    if (!this.isValidExcerpt(excerpt)) errors.push("Invalid excerpt");
    if (!this.isValidContent(content)) errors.push("Invalid content");
    if (errors.length) throw new BadRequestException(errors.join(", "));
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException("Post not found");
    post.update({ title, excerpt, content });
    await this.postRepository.update(post);
  }

  private isValidTitle(title?: string): boolean {
    if (!title) return true;
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.title;
    if (title.length < MIN_LENGTH || title.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidExcerpt(excerpt?: string): boolean {
    if (!excerpt) return true;
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.excerpt;
    if (excerpt.length < MIN_LENGTH || excerpt.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidContent(content?: string): boolean {
    if (!content) return true;
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.content;
    if (content.length < MIN_LENGTH || content.length > MAX_LENGTH) return false;
    return true;
  }
}
