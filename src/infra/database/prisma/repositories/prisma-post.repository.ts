import { PrismaClient } from "@prisma/client";
import { PostEntity } from "../../../../modules/post/post.entity";
import { PostRepository } from "../../../../modules/post/post.repository";

export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(id: string): Promise<PostEntity | undefined> {
    const result = await this.prisma.post.findUnique({ where: { id } });
    if (!result) return undefined;
    return new PostEntity({
      id: result.id,
      title: result.title,
      slug: result.slug,
      excerpt: result.excerpt,
      content: result.content,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    const result = await this.prisma.post.findMany();
    return result.map(
      (row) =>
        new PostEntity({
          id: row.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        })
    );
  }

  async create(post: PostEntity): Promise<void> {
    const postObject = post.toObject();
    await this.prisma.post.create({
      data: {
        id: postObject.id,
        title: postObject.title,
        slug: postObject.slug,
        excerpt: postObject.excerpt,
        content: postObject.content,
        createdAt: postObject.createdAt,
        updatedAt: postObject.updatedAt,
      },
    });
  }

  async update(post: PostEntity): Promise<void> {
    const postObject = post.toObject();
    await this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: postObject.title,
        slug: postObject.slug,
        excerpt: postObject.excerpt,
        content: postObject.content,
        updatedAt: postObject.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
