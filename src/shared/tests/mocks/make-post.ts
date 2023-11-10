import { faker } from "@faker-js/faker";

export function makePost(
  overrides?: Partial<{
    id: string;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }>
) {
  return {
    title: faker.lorem.sentence(),
    excerpt: faker.lorem.paragraph(),
    content: faker.lorem.paragraph({ min: 10, max: 15 }),
    ...overrides,
  };
}
