import * as core from "@actions/core";

// Validating inputs
try {
  parseInt(core.getInput("whichCron"));
} catch {
  core.setFailed("Int value expected for whichCron input.");
}
if (core.getInput("whatToRandomize") === "") {
  core.setFailed("Input for whatToRandomize is not valid.");
}
if (core.getInput("file") === "") {
  core.setFailed(
    "Input for file is not valid, please dont set that value. Leave it empty.",
  );
}

// Reading inputs
export const whichCron: number = parseInt(core.getInput("whichCron"));
export const whatToRandomize: string = core.getInput("whatToRandomize");

export const file: string = (function file(): string {
  const parts: string[] = core.getInput("file").split("@");
  var directory: string[] = parts[0].split("/");
  directory = directory.slice(-3);
  const endPath: string = directory.join("/");

  return endPath;
})();
