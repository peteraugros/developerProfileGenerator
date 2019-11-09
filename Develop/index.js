
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const questions = ["Enter your GitHub username:", "Select your favorite color:"];

function writeToFile(filename, data) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.green("File written successfully"));
  });
}

function appendToFile(filename, data) {
  fs.appendFile(filename, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.green("File written successfully"));
  });
}

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: questions[0]
      },
      {
        type: "list",
        message: questions[1],
        name: "color",
        choices: ["green", "blue", "pink", "red"]
      }
    ])
    .then(function(data) {
      const page = generateHTML.generateHTML(data);
      writeToFile(filename, page);
      return data;
    })
    .then(function(data) {
      const queryUrl = `https://api.github.com/users/${data.username}`;
      const followUrl = `https://api.github.com/users/${data.username}/followers`;

      axios.get(queryUrl).then(function(res) {
        const htmlBody = generateHTML.generateBody(res);
        appendToFile(filename, htmlBody);
        console.log(res.data.html_url);
      });
    });
}

init();