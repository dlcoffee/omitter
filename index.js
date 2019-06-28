const _omit = require("lodash.omit");
const program = require("commander");
const fs = require("fs");

let jsonFilepath;

program
  .version("0.1.0")
  .arguments("<filepath>")
  .action(function(filepath) {
    jsonFilepath = filepath;
  })
  .parse(process.argv);

if (typeof jsonFilepath === "undefined") {
  console.error("no filepath given!");
  process.exit(1);
}

let content;
try {
  content = fs.readFileSync(jsonFilepath);
  content = JSON.parse(content.toString());
} catch (err) {
  console.error(err);
  process.exit(1);
}

const omitPaths = [
  "systemRepresentations",
  "cast",
  "crew",
  "ratings",
  "keywords",
  "versions",
  "mpmProductIds",
  "mpmFamilyIds",
  "imageUrl"
];

console.log(_omit(content, omitPaths));
