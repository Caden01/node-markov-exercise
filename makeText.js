const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
  let markovMachine = new markov.MarkovMachine(text);
  console.log(markovMachine.makeText());
}

function createText(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.log(`Cannot read fiel: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function createURL(url) {
  let res;

  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(`Cannot read file: ${path}: ${err}`);
    process.exit(1);
  }
  generateText(res.data);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  createText(path);
} else if (method === "url") {
  createURL(path);
} else {
  console.log(`Unkown method: ${method}`);
  process.exit(1);
}
