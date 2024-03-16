import * as core from "@actions/core";

describe("Inputs files", () => {
  it("Get inputs from Github", () => {
    jest.spyOn(core, "getInput").mockReturnValue("string");

    const result: string = core.getInput("test1");
    expect(result).toBe("string");

    jest.restoreAllMocks();
  });

  it("Parse input to integer", () => {
    jest.spyOn(core, "getInput").mockReturnValue("1");

    const result: string = core.getInput("test2");
    expect(typeof parseInt(result)).toBe("number");

    jest.restoreAllMocks();
  });

  it("Format the input path file", () => {
    jest.spyOn(core, "getInput").mockReturnValue("userName/repoName/.github/workflows/test.yaml@refs/heads/development");

    const parts: string[] = core.getInput("test1").split("@");

    const directory: string[] = parts[0].split("/").slice(-3);

    const result: string = directory.join("/");

    expect(result).toEqual(".github/workflows/test.yaml")

    jest.restoreAllMocks();
  });
});
