import * as main from "../src/main";
import * as core from "@actions/core";
// import * as fs from "fs";
import fs from "fs";

describe("main.ts, findCrons", () => {
  it("Gets an string as an argument.", () => {
    const argument: string = "argument";
    expect(typeof argument).toBe("string");

    jest.clearAllMocks();
  });

  it("Returns an arrys of strings when a valid file path is given.", () => {
    const filePath = "testFile.txt";

    const expectedCrons = [
      '- cron: cron1',
      '- cron: cron2',
      '- cron: cron3'
    ];

    const fileContent = "Some content\n" + expectedCrons.join("\n") + "\nSome other content";

    jest.spyOn(fs, "readFileSync").mockReturnValueOnce(fileContent);

    const result = main.findCrons(filePath);

    expect(result).toEqual(expectedCrons);

  });

  it('Should return an empty array when no cron lines are found in the file', () => {
    const filePath = 'testFile.txt';

    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(
      "Some content\n" +
      "Some other content"
    );

    const result = main.findCrons(filePath);

    expect(result).toEqual([]);
  });

  test('should set failure message if no cronjobs found', () => {

    jest.mock('fs');
    const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;



    // Mock el contenido del archivo sin cronjobs
    mockReadFileSync.mockReturnValueOnce('');

    // Llama a la función
    main.findCrons('mockedFile.txt');

    // Verifica que core.setFailed sea llamado con el mensaje correcto
    expect(core.setFailed).toHaveBeenCalledWith('Not found any cronjob.');
  });

});
