import * as core from "@actions/core";
import * as fs from "fs";
import * as utils from "./utils";
import * as inputs from "./inputs";

// Function to find cronjobs on our file
const findCrons = (file: string): string[] => {
  const fileContent: string = fs.readFileSync(file, "utf-8");
  const lines: string[] = fileContent.split("\n");
  const coincidences: string[] = [];

  const regex: RegExp = /- cron: (.*)/;

  lines.forEach((line) => {
    if (regex.test(line)) {
      coincidences.push(line);
    }
  });

  return coincidences;
};

const randomizeValues = (cronjob: string): string[] => {
  const inputs: string[] = cronjob.split(" ");
  var randomizedValues: string[] = [];

  if (inputs[0] === "y") {
    const newMinutes = utils.generateMinutes();
    randomizedValues.push(newMinutes);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[1] === "y") {
    const newHours = utils.generateHours();
    randomizedValues.push(newHours);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[2] === "y") {
    const newDayOfMonth = utils.generateDayOfMonth();
    randomizedValues.push(newDayOfMonth);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[3] === "y") {
    const newMonth = utils.generateMonth();
    randomizedValues.push(newMonth);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[4] === "y") {
    const newDayOfWeek = utils.generateDayOfWeek();
    randomizedValues.push(newDayOfWeek);
  } else {
    randomizedValues.push("n");
  }

  return randomizedValues;
};


const buildCronjob = (cronjob: string, randomValues: string[]): string[] => {
  const regex: RegExp = /"([^"]*)"/g;

  var values: string[] = [];
  var newValues: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cronjob)) !== null) {
    values.push(match[1]);
  }

  values = values[0].split(" ");

  for (let value = 0; value < randomValues.length; value++) {
    if (randomValues[value] !== "n") {
      newValues.push(randomValues[value]);
    } else {
      newValues.push(values[value]);
    }
  }

  const newValue: string = newValues.join(" ");

  console.log(`The new cronjob value is: ${newValue}`);

  return newValues;
};


const replaceValues = (
  cronjob: string,
  randomValues: string[],
  file: string,
) => {
  let newCronExpression = cronjob.replace(/"([^"]*)"/, randomValues.join(" "));

  const regex = /- cron:\s*(.*)/;
  const match = newCronExpression.match(regex);

  if (match && match.length > 1) {
    const cronValue = match[1];
    newCronExpression = newCronExpression.replace(cronValue, `"${cronValue}"`);
  }

  fs.readFile(file, "utf8", (error, data) => {
    if (error) {
      core.setFailed(`Error reading the file: ${error}`);
      return;
    }

    let newData = data.replace(cronjob, newCronExpression);

    fs.writeFile(file, newData, "utf8", (error) => {
      if (error) {
        core.setFailed(`Error writing the file: ${error}`);
        return;
      }
    });
  });
};


export const run = async () => {
  const cronjob: string = findCrons(inputs.file)[inputs.whichCron];
  const randomValues = randomizeValues(inputs.whatToRandomize);
  const builtCronjob: string[] = buildCronjob(cronjob, randomValues);
  replaceValues(cronjob, builtCronjob, inputs.file);
}

