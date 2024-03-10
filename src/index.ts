import * as core from "@actions/core";
import * as fs from "fs";

// Reading inputs
const fixedFilePath = (filePath: string): string => {
  const parts: string[] = filePath.split("@");
  const directory: string = parts[0];

  return directory;
};

const which_cron: string = core.getInput("which_cron");
const what_to_randomize: string = core.getInput("what_to_randomize");
const file: string = fixedFilePath(core.getInput("file"));

console.log(`which_cron: ${which_cron}`);
console.log(`what_to_randomize: ${what_to_randomize}`);
console.log(`file: ${file}`);

function findCrons(file: string): string[] {
  const fileContent = fs.readFileSync(file, "utf-8");
  const lines = fileContent.split("\n");
  const coincidences: string[] = [];

  const regex = /- cron: (.*)/;

  lines.forEach((line) => {
    if (regex.test(line)) {
      coincidences.push(line);
    }
  });

  return coincidences;
}

console.log(findCrons(file));
