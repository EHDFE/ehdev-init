const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const pkg = require('../package.json');
const project = require('./project');
const tplConfig = require('./template.js');
const tplList = Object.keys(tplConfig);

const projectRoot = process.cwd();
const configPath = path.join(projectRoot, 'abc.json');

// create a new abc.json
const createConfigJson = (exist) => {
  let method;
  if (exist) {
    method = 'writeFile';
  } else {
    method = 'appendFile';
  }
  return new Promise((resolve, reject) => {
    fs[method](configPath, require('./template'), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
};

async function setup() {
  if (fs.existsSync(configPath)) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'override',
        message: 'The project already has the config file (abc.json). Would you like to override the file ?',
        default: 'Yes',
        choices: ['Yes', 'No'],
      }
    ]).then((res) => {
      if (res.override === 'Yes') {
        createConfigJson(true);
      }
    });
  } else {
    createConfigJson(false);
  }
}

module.exports = {

  command: 'init',

  description: pkg.description,

  options: [
    [ '    --type <type>', 'shortcut of template option' ],
    // [ '-c, --config', 'generate config only' ]
  ],

  action(command) {
    console.log(arguments)
    let type;
    if (arguments.length === 1) {
        if (command.type) {
          type = command.type;
        }
    }
    if (!type) {
      inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Please select your template?',
          default: tplList[0],
          choices: tplList,
        }
      ]).then((res) => {
        project.init(res.type);
      });
    } else {
      if (!tplConfig[type]) {
        console.log(`
          Sorry, the template you've selected is not defined yet!
          Please contact the maintainer: ${chalk.green(pkg.author)}.
        `);
      } else {
        project.init(type);
      }
    }
  },
};