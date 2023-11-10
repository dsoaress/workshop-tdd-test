import { BadRequestException } from "./bad-request.exception";

describe("NotFoundException", () => {
  it("should be defined", () => {
    expect(new BadRequestException("")).toBeDefined();
    expect(new BadRequestException("").name).toBe("BadRequestException");
  });
});
