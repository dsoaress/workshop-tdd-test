import { UnprocessableEntityException } from "./unprocessable-entity.exception";

describe("NotFoundException", () => {
  it("should be defined", () => {
    expect(new UnprocessableEntityException("")).toBeDefined();
    expect(new UnprocessableEntityException("").name).toBe("UnprocessableEntityException");
  });
});
