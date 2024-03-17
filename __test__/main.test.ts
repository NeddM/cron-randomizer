import * as main from "../src/main";
// import * as fs from "fs";
import fs from "fs";

describe("main.ts, findCrons", () => {

  it("Gets an string as an argument.", () => {
    const argument: string = "argument";
    expect(typeof argument).toBe("string")

    jest.clearAllMocks();
  });

  it("Returns an arrys of strings when a valid file path is given.", () => {
    // jest.mock('fs');

    const filePath = "testFile.txt";
    const expectedCrons = [
      '- cron: cron1',
      '- cron: cron2',
      '- cron: cron3'
    ];
    const expectedFs = "some text \n" + expectedCrons + "some more text \n";

    jest.spyOn(fs, "readFileSync").mockImplementation();




    // jest.spyOn(fs, "readFileSync").mockImplementation(`some text, ${expectedCrons}`);

    // jest.mock(filePath, () => {
    //   return {
    //     __esModule: true,
    //     ...jest.requireActual(filePath)
    //   }
    // });

    // jest.spyOn(fs, "readFileSync").mockReturnValueOnce("some text" + expectedCrons);


    const result = main.findCrons(filePath);

    expect(result).toEqual(expectedCrons);




  });

});
