import { makePost } from "../../shared/tests/mocks/make-post";
import { PostEntity } from "./post.entity";

describe("PostEntity", () => {
  it("should be possible to create a new PostEntity", () => {
    const post = makePost();
    const postEntity = new PostEntity(post);
    expect(postEntity instanceof PostEntity).toBeTruthy();
    expect(postEntity).toBeInstanceOf(PostEntity);
    expect(postEntity.toObject()).toMatchObject({
      id: expect.any(String),
      title: post.title,
      slug: expect.any(String),
      excerpt: post.excerpt,
      content: post.content,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should be possible to update the title of a PostEntity", () => {
    const post = makePost();
    const postEntity = new PostEntity(post);
    const newTitle = "New title";
    postEntity.update({ title: newTitle });
    expect(postEntity.title).toBe(newTitle);
  });

  it("should be possible to update the slug of a PostEntity", () => {
    const post = makePost();
    const postEntity = new PostEntity(post);
    const newSlug = "new-slug";
    postEntity.update({ slug: newSlug });
    expect(postEntity.slug).toBe(newSlug);
  });

  it("should be possible to update the excerpt of a PostEntity", () => {
    const post = makePost();
    const postEntity = new PostEntity(post);
    const newExcerpt = "New excerpt";
    postEntity.update({ excerpt: newExcerpt });
    expect(postEntity.excerpt).toBe(newExcerpt);
  });

  it("should be possible to update the content of a PostEntity", () => {
    const post = makePost();
    const postEntity = new PostEntity(post);
    const newContent = "New content. ".repeat(100);
    postEntity.update({ content: newContent });
    expect(postEntity.content).toBe(newContent);
  });

  it("should throw an error if the title is invalid", () => {
    expect(() => new PostEntity(makePost({ title: undefined }))).toThrow();
    expect(() => new PostEntity(makePost({ title: "" }))).toThrow();
    expect(() => new PostEntity(makePost({ title: "a".repeat(258) }))).toThrow();
  });

  it("should throw an error if the slug is invalid", () => {
    expect(() => new PostEntity(makePost({ slug: "" }))).toThrow();
    expect(() => new PostEntity(makePost({ slug: "*!" }))).toThrow();
  });

  it("should throw an error if the excerpt is invalid", () => {
    expect(() => new PostEntity(makePost({ excerpt: undefined }))).toThrow();
    expect(() => new PostEntity(makePost({ excerpt: "" }))).toThrow();
    expect(() => new PostEntity(makePost({ excerpt: "a".repeat(256) }))).toThrow();
  });

  it("should throw an error if the content is invalid", () => {
    expect(() => new PostEntity(makePost({ content: undefined }))).toThrow();
    expect(() => new PostEntity(makePost({ content: "a".repeat(199) }))).toThrow();
    expect(() => new PostEntity(makePost({ content: "a".repeat(5001) }))).toThrow();
  });

  it("should throw an error if the createdAt is invalid", () => {
    expect(() => new PostEntity(makePost({ createdAt: "invalid-date" as any }))).toThrow();
  });

  it("should throw an error if the updatedAt is invalid", () => {
    expect(() => new PostEntity(makePost({ updatedAt: "invalid-date" as any }))).toThrow();
  });
});
