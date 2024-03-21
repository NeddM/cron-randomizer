import * as main from "../src/main";

// Mock the action's entrypoint
const runMock = jest.spyOn(main, "run").mockImplementation();

describe("index", () => {
  it("Calls run when imported", async () => {
    require("../src/index");

    expect(runMock).toHaveBeenCalled();
  });
});