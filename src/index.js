const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const pkg = require('../package.json');
const project = require('./project');
const projectConfig = require('../projects/index.js');

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
    [ '    --type <type>', '项目类型' ],
    [ '    --skipinstall', '跳过安装依赖' ],
    // [ '-c, --config', 'generate config only' ]
  ],

  action(command) {
    const options = {
      skipinstall: command.skipinstall,
    };
    if (command.type) {
      project.init(Object.assign(options, {
        type: command.type,
      }));
    } else {
      const projects = Object.keys(projectConfig);
      inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Please select your project type?',
          default: projects[0],
          choices: projects,
        }
      ]).then((res) => {
        project.init(Object.assign(options, {
          type: res.type,
        }));
      });
    }
  },
};