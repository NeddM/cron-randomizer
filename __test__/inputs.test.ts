import * as core from "@actions/core";

describe("Inputs files", () => {
  it("Get inputs from Github", () => {
    jest.spyOn(core, "getInput").mockReturnValue("string");

    const res = core.getInput("test1");
    expect(res).toBe("string");

    jest.restoreAllMocks();
  });
});
