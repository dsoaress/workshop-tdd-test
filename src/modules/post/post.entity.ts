import { randomUUID } from "node:crypto";
import { postConfig } from "./post.config";
import { UnprocessableEntityException } from "../../shared/exceptions/unprocessable-entity.exception";

export class PostEntity {
  private readonly _id: string;
  private readonly _createdAt: Date;

  private _title: string;
  private _slug: string;
  private _excerpt: string;
  private _content: string;
  private _updatedAt: Date;

  constructor({
    id,
    title,
    slug,
    excerpt,
    content,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = id ?? randomUUID();
    this._title = title;
    this._slug = slug ?? this.createSlug(title);
    this._excerpt = excerpt;
    this._content = content;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get slug(): string {
    return this._slug;
  }

  get excerpt(): string {
    return this._excerpt;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update({
    title,
    excerpt,
    content,
  }: {
    title?: string;
    excerpt?: string;
    content?: string;
  }): void {
    this._title = title ?? this._title;
    this._slug = (title && this.createSlug(title)) ?? this._slug;
    this._excerpt = excerpt ?? this._excerpt;
    this._content = content ?? this._content;
    this._updatedAt = new Date();
    this.validate();
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      excerpt: this.excerpt,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  private createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  private isValidTitle(title: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.title;
    if (title.length < MIN_LENGTH || title.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) return false;
    return true;
  }

  private isValidExcerpt(excerpt: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.excerpt;
    if (excerpt.length < MIN_LENGTH || excerpt.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidContent(content: string): boolean {
    const { MIN_LENGTH, MAX_LENGTH } = postConfig.content;
    if (content.length < MIN_LENGTH || content.length > MAX_LENGTH) return false;
    return true;
  }

  private isValidCreatedAt(createdAt: Date): boolean {
    if (!(createdAt instanceof Date)) return false;
    return true;
  }

  private isValidUpdatedAt(updatedAt: Date): boolean {
    if (!(updatedAt instanceof Date)) return false;
    return true;
  }

  private validate(): void {
    const errors: string[] = [];
    if (!this.isValidTitle(this._title)) errors.push("Invalid title");
    if (!this.isValidSlug(this._slug)) errors.push("Invalid slug");
    if (!this.isValidExcerpt(this._excerpt)) errors.push("Invalid excerpt");
    if (!this.isValidContent(this._content)) errors.push("Invalid content");
    if (!this.isValidCreatedAt(this._createdAt)) errors.push("Invalid createdAt");
    if (!this.isValidUpdatedAt(this._updatedAt)) errors.push("Invalid updatedAt");
    if (errors.length) throw new UnprocessableEntityException(errors.join(", "));
  }
}
