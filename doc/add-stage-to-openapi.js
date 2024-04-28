const openapiSpec = require('./openapi.json');
const fs = require("fs")

const stage = process.argv[2] || "dev";

const paths = openapiSpec.paths;
const updatedPaths = {};
for (const path in paths) {
  updatedPaths[`/${stage}` + path] = paths[path];
}

openapiSpec.paths = updatedPaths

fs.writeFileSync(__dirname + '/openapi.json', JSON.stringify(openapiSpec));