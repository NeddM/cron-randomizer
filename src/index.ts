import * as core from "@actions/core";
import * as fs from "fs";

// Reading inputs
const whichCron: number = parseInt(core.getInput("which_cron"));
const whatToRandomize: string = core.getInput("what_to_randomize");

const file: string = (function file(): string {
  const parts: string[] = core.getInput("file").split("@");
  var directory: string[] = parts[0].split("/");
  directory = directory.slice(-3);
  // const endPath: string = `${directory[-3]}/${directory[-2]}/${directory[-1]}`;
  const endPath: string = directory.join("/");

  return endPath;
})();

console.log(`which_cron input: ${whichCron}`);
console.log(`what_to_randomize input: ${whatToRandomize}`);
console.log(`file input: ${file}`);

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
    const newMinutes = generateMinutes();
    randomizedValues.push(newMinutes);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[1] === "y") {
    const newHours = generateHours();
    randomizedValues.push(newHours);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[2] === "y") {
    const newDayOfMonth = generateDayOfMonth();
    randomizedValues.push(newDayOfMonth);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[3] === "y") {
    const newMonth = generateMonth();
    randomizedValues.push(newMonth);
  } else {
    randomizedValues.push("n");
  }

  if (inputs[4] === "y") {
    const newDayOfWeek = generateDayOfWeek();
    randomizedValues.push(newDayOfWeek);
  } else {
    randomizedValues.push("n");
  }

  // return randomizedValues.join(" ");
  return randomizedValues;
};

const generateMinutes = (): string => {
  return Math.floor(Math.random() * 60).toString();
};
const generateHours = (): string => {
  return Math.floor(Math.random() * 24).toString();
};
const generateDayOfMonth = (): string => {
  return Math.floor(Math.random() * 28).toString();
};
const generateMonth = (): string => {
  return Math.floor(Math.random() * 12).toString();
};
const generateDayOfWeek = (): string => {
  return Math.floor(Math.random() * 7).toString();
};

const replaceValues = (cronjob: string, randomValues: string[]) => {
  // Utilizando una expresión regular para encontrar valores entre comillas
  let nuevaCronExpression = cronjob.replace(
    /"([^"]*)"/,
    randomValues.join(" "),
  );

  fs.readFile(file, "utf8", (error, data) => {
    if (error) {
      console.error("Error al leer el archivo:", error);
      return;
    }

    // Modifica la línea deseada
    let nuevaData = data.replace(cronjob, nuevaCronExpression);

    // Escribe los cambios de vuelta al archivo
    fs.writeFile(file, nuevaData, "utf8", (error) => {
      if (error) {
        console.error("Error al escribir en el archivo:", error);
        return;
      }
      console.log("El archivo ha sido modificado satisfactoriamente.");
    });
  });
};

// console.log(findCrons(file));

const cronjob: string = findCrons(file)[whichCron];
const randomValues = randomizeValues(whatToRandomize);
replaceValues(cronjob, randomValues);
